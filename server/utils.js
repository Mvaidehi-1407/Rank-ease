/**
 * Backend Utilities & Service Functions
 * Extracted business logic for better organization and reusability
 */

import db from './db.js';
import {
  BRANCHES,
  DB_LIMITS,
  MESSAGE_TEMPLATES,
  ADMISSION_MESSAGES,
  PROBABILITY_THRESHOLDS,
  PREDICTION_STATUS
} from './constants.js';

/**
 * Extract rank number from message text
 * @param {string} message - User message
 * @returns {number|null} - Extracted rank or null
 */
export const extractRank = (message) => {
  const match = message.match(/\b\d{3,6}\b/);
  return match ? Number(match[0]) : null;
};

/**
 * Get branch from message text
 * @param {string} message - User message
 * @returns {string|null} - Detected branch or null
 */
export const extractBranch = (message) => {
  const upperMessage = message.toUpperCase();
  const branchList = Object.values(BRANCHES);
  return branchList.find((branch) => upperMessage.includes(branch)) || null;
};

/**
 * Build local AI assistant reply based on message content
 * @param {string} message - User message
 * @param {Array} relatedColleges - Related colleges from database
 * @returns {string} - Local assistant response
 */
export const buildLocalAssistantReply = (message, relatedColleges = []) => {
  const query = message.toLowerCase();

  // If we have related colleges, prioritize them
  if (relatedColleges.length > 0) {
    const collegeList = relatedColleges
      .slice(0, 5)
      .map((college) => 
        `${college.Name} (${college.Branch}, cutoff ${college.LastRank}, ${college.Location})`
      )
      .join('\n- ');

    return `Based on the current RankWise database, these are relevant options:\n\n- ${collegeList}\n\nUse the Predictor Hub filters for a tighter category, region, and gender match.`;
  }

  // Topic-based responses
  if (query.includes('cutoff') || query.includes('trend')) {
    return MESSAGE_TEMPLATES.CUTOFF_INFO;
  }

  if (query.includes('placement') || query.includes('roi')) {
    return MESSAGE_TEMPLATES.ROI_INFO;
  }

  return MESSAGE_TEMPLATES.DEFAULT_HELP;
};

/**
 * Get related colleges from database based on message content
 * @param {string} message - User message
 * @returns {Array} - Related colleges
 */
export const getRelatedColleges = (message) => {
  const rank = extractRank(message);
  const branch = extractBranch(message);

  if (!rank && !branch) return [];

  const filters = [];
  const params = {};

  if (branch) {
    filters.push('Branch = @branch');
    params.branch = branch;
  }

  if (rank) {
    filters.push('LastRank >= @rank - 5000');
    params.rank = rank;
  }

  const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  const orderClause = rank ? 'ORDER BY ABS(LastRank - @rank) ASC' : 'ORDER BY LastRank ASC';

  try {
    return db
      .prepare(
        `SELECT Name, Location, Branch, Category, Gender, Region, LastRank, ROI, Placements
         FROM colleges
         ${whereClause}
         ${orderClause}
         LIMIT ${DB_LIMITS.MAX_AI_RELATED_COLLEGES}`
      )
      .all(params);
  } catch (error) {
    console.error('Error getting related colleges:', error);
    return [];
  }
};

/**
 * Calculate admission probability and status for a college
 * @param {number} rank - Student's rank
 * @param {number} collegeLastRank - College's last cutoff rank
 * @returns {object} - { probability, status }
 */
export const calculateAdmissionProbability = (rank, collegeLastRank) => {
  const diff = collegeLastRank - rank;
  let probability;
  let status;

  // Safe category: cutoff is better than student's rank
  if (diff >= PROBABILITY_THRESHOLDS.SAFE_LARGE_MARGIN) {
    probability = 95;
    status = PREDICTION_STATUS.SAFE;
  } else if (diff >= 0 && diff < PROBABILITY_THRESHOLDS.SAFE_LARGE_MARGIN) {
    probability = PROBABILITY_THRESHOLDS.SAFE_HIGH_PROB + (diff / PROBABILITY_THRESHOLDS.SAFE_LARGE_MARGIN) * 15;
    status = PREDICTION_STATUS.SAFE;
  }
  // Target category: close to student's rank
  else if (diff < 0 && diff > -PROBABILITY_THRESHOLDS.SAFE_LARGE_MARGIN) {
    probability = PROBABILITY_THRESHOLDS.TARGET_MIN_PROB + ((PROBABILITY_THRESHOLDS.SAFE_LARGE_MARGIN + diff) / PROBABILITY_THRESHOLDS.SAFE_LARGE_MARGIN) * 30;
    status = PREDICTION_STATUS.TARGET;
  }
  // Dream category: significantly better than student's rank
  else if (diff <= -PROBABILITY_THRESHOLDS.SAFE_LARGE_MARGIN && diff > -PROBABILITY_THRESHOLDS.DREAM_DEEP_THRESHOLD) {
    probability = PROBABILITY_THRESHOLDS.DREAM_MIN_PROB + ((PROBABILITY_THRESHOLDS.DREAM_DEEP_THRESHOLD + diff) / 10000) * 40;
    status = PREDICTION_STATUS.DREAM;
  }
  // Far dream category
  else {
    probability = 5;
    status = PREDICTION_STATUS.DREAM;
  }

  return {
    probability: Math.round(probability),
    status
  };
};

/**
 * Get AI reasoning for admission probability
 * @param {string} status - Admission status (Safe, Target, Dream)
 * @param {number} rank - Student's rank
 * @param {number} collegeLastRank - College's cutoff
 * @param {string} category - Student's category
 * @returns {string} - AI reasoning
 */
export const getAdmissionReasoning = (status, rank, collegeLastRank, category) => {
  if (status === PREDICTION_STATUS.SAFE) {
    return ADMISSION_MESSAGES.SAFE(rank, collegeLastRank, category);
  } else if (status === PREDICTION_STATUS.TARGET) {
    return ADMISSION_MESSAGES.TARGET(rank, collegeLastRank);
  } else {
    return ADMISSION_MESSAGES.DREAM(rank, collegeLastRank);
  }
};

/**
 * Validate prediction parameters
 * @param {object} params - { rank, category, gender, region, branch }
 * @returns {object} - { isValid, error }
 */
export const validatePredictionParams = (params) => {
  const { rank, category, gender, region, branch } = params;

  if (!rank || !category || !gender || !region || !branch) {
    return {
      isValid: false,
      error: 'Missing required parameters'
    };
  }

  if (typeof rank !== 'number' || rank < 1 || rank > 150000) {
    return {
      isValid: false,
      error: 'Rank must be between 1 and 150000'
    };
  }

  return { isValid: true };
};

export default {
  extractRank,
  extractBranch,
  buildLocalAssistantReply,
  getRelatedColleges,
  calculateAdmissionProbability,
  getAdmissionReasoning,
  validatePredictionParams
};
