/**
 * Backend Constants & Configuration
 * Centralized configuration for consistency across the application
 */

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Error Codes
export const ERROR_CODES = {
  MISSING_PARAMS: 'MISSING_PARAMS',
  INVALID_PARAMS: 'INVALID_PARAMS',
  DB_ERROR: 'DB_ERROR',
  AI_ERROR: 'AI_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
};

// EAMCET Categories
export const CATEGORIES = {
  OC: 'OC',
  BC_A: 'BC-A',
  BC_B: 'BC-B',
  BC_C: 'BC-C',
  BC_D: 'BC-D',
  BC_E: 'BC-E',
  SC: 'SC',
  ST: 'ST'
};

// Engineering Branches
export const BRANCHES = {
  CSE: 'CSE',
  ECE: 'ECE',
  IT: 'IT',
  EEE: 'EEE',
  MECH: 'MECH',
  CIVIL: 'CIVIL'
};

// University Regions
export const REGIONS = {
  OU: 'OU',
  AU: 'AU',
  SVU: 'SVU',
  NON_LOCAL: 'Non-Local'
};

// Gender Categories
export const GENDERS = {
  BOYS: 'Boys',
  GIRLS: 'Girls'
};

// Prediction Status
export const PREDICTION_STATUS = {
  SAFE: 'Safe',
  TARGET: 'Target',
  DREAM: 'Dream'
};

// Probability Thresholds
export const PROBABILITY_THRESHOLDS = {
  SAFE_LARGE_MARGIN: 5000,
  SAFE_HIGH_PROB: 80,
  TARGET_MIN_PROB: 50,
  DREAM_MIN_PROB: 10,
  DREAM_THRESHOLD: 5000,
  DREAM_DEEP_THRESHOLD: 15000
};

// Database Limits
export const DB_LIMITS = {
  MAX_COLLEGE_RESULTS: 10,
  MAX_TRENDS_RESULTS: 20,
  MAX_AI_RELATED_COLLEGES: 8
};

// AI Configuration
export const AI_CONFIG = {
  MODEL: 'gemini-2.5-flash',
  TEMPERATURE: 0.7,
  RESPONSE_LENGTH: '1-2 short paragraphs'
};

// Message Templates
export const MESSAGE_TEMPLATES = {
  CUTOFF_INFO: 'Cutoffs usually move with seat count, branch demand, category, region, and counselling round behavior. CSE and IT tend to stay competitive, while ECE can be a strong target if your rank is near the previous closing rank.',
  ROI_INFO: 'For ROI and placements, compare college fees, median package, branch strength, and location. Government colleges and strong Hyderabad private colleges often score well in the RankWise dataset.',
  DEFAULT_HELP: 'I can help with college prediction, EAMCET counselling, branch comparison, cutoff trends, ROI, placements, and general career questions. Share your rank, category, preferred branch, and region for a more specific answer.'
};

// Admission Probability Messages
export const ADMISSION_MESSAGES = {
  SAFE: (rank, cutoff, category) => 
    `Your rank (${rank}) is well within the historical cutoff (${cutoff}) for ${category}. This is a highly likely admission.`,
  TARGET: (rank, cutoff) => 
    `Your rank (${rank}) is close to the cutoff (${cutoff}). Fluctuations in seat availability make this a solid target.`,
  DREAM: (rank, cutoff) => 
    `This is a dream school. Your rank (${rank}) is above the typical cutoff (${cutoff}), but category shifts may provide an edge.`
};

// API Response Messages
export const RESPONSE_MESSAGES = {
  SUCCESS: 'Request processed successfully',
  ERROR_MISSING_PARAMS: 'One or more required parameters are missing',
  ERROR_INVALID_PARAMS: 'One or more parameters are invalid',
  ERROR_DB: 'Database query failed. Please try again.',
  ERROR_AI: 'AI service temporarily unavailable. Using local recommendations.',
  ERROR_INTERNAL: 'An unexpected error occurred. Please try again later.'
};

export default {
  HTTP_STATUS,
  ERROR_CODES,
  CATEGORIES,
  BRANCHES,
  REGIONS,
  GENDERS,
  PREDICTION_STATUS,
  PROBABILITY_THRESHOLDS,
  DB_LIMITS,
  AI_CONFIG,
  MESSAGE_TEMPLATES,
  ADMISSION_MESSAGES,
  RESPONSE_MESSAGES
};
