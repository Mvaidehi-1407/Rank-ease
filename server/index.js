import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import db from './db.js';
import {
  HTTP_STATUS,
  DB_LIMITS,
  AI_CONFIG
} from './constants.js';
import {
  extractRank,
  buildLocalAssistantReply,
  getRelatedColleges,
  calculateAdmissionProbability,
  getAdmissionReasoning,
  validatePredictionParams
} from './utils.js';
import {
  successResponse,
  databaseError,
  aiError,
  internalError,
  missingParamsError
} from './responses.js';
import {
  errorHandler,
  validateRequest,
  sanitizeRequest,
  notFoundHandler,
  requestLogger
} from './middleware.js';
import { rateLimit, apiLimiter } from './rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware Stack
app.use(cors());
app.use(express.json());
app.use(sanitizeRequest);
app.use(requestLogger);

// Apply rate limiting to API endpoints
app.use('/api/', rateLimit(apiLimiter, 'API rate limit exceeded. Please try again later.'));

// API Endpoint: Get predictions for colleges
app.post('/api/predict', (req, res) => {
  try {
    const { rank, category, gender, region, branch } = req.body;

    // Validate parameters
    const validation = validatePredictionParams({ rank, category, gender, region, branch });
    if (!validation.isValid) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        missingParamsError([validation.error])
      );
    }

    // Query database for matching colleges
    const stmt = db.prepare(`
      SELECT * FROM colleges
      WHERE Branch = ?
        AND Category = ?
        AND Region = ?
        AND (Gender = ? OR Gender = 'Boys')
      ORDER BY ABS(LastRank - ?) ASC
      LIMIT ?
    `);

    const colleges = stmt.all(branch, category, region, gender, rank, DB_LIMITS.MAX_COLLEGE_RESULTS);

    // Process results with prediction logic
    const results = colleges.map(college => {
      const { probability, status } = calculateAdmissionProbability(rank, college.LastRank);
      const aiReasoning = getAdmissionReasoning(status, rank, college.LastRank, category);

      return {
        ...college,
        probability,
        status,
        aiReasoning
      };
    });

    res.status(HTTP_STATUS.OK).json(
      successResponse(results, 'College predictions retrieved successfully')
    );
  } catch (error) {
    console.error('Prediction Error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
      databaseError(error)
    );
  }
});

// API Endpoint: Get cutoff trends
app.get('/api/trends', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT Name, Branch, LastRank FROM colleges 
      LIMIT ?
    `);
    const trends = stmt.all(DB_LIMITS.MAX_TRENDS_RESULTS);

    res.status(HTTP_STATUS.OK).json(
      successResponse(trends, 'Trends retrieved successfully')
    );
  } catch (error) {
    console.error('Trends Error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
      databaseError(error)
    );
  }
});

// API Endpoint: Chat with AI Assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { message = '', context = {} } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    // Validate message
    if (!message.trim()) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        missingParamsError(['message'])
      );
    }

    // Get related colleges from database
    const relatedColleges = getRelatedColleges(message);
    const databaseContext = relatedColleges.length > 0
      ? relatedColleges
          .map((college) => 
            `${college.Name}, ${college.Branch}, ${college.Category}, ${college.Region}, ${college.Gender}, cutoff ${college.LastRank}, ROI ${college.ROI}, placements ${college.Placements}`
          )
          .join('\n')
      : 'No direct database matches were found for this message.';

    // If no Gemini API key, use local response
    if (!apiKey) {
      const reply = buildLocalAssistantReply(message, relatedColleges);
      return res.status(HTTP_STATUS.OK).json(
        successResponse({
          message: reply,
          source: 'local',
          relatedColleges
        }, 'Response generated from local database')
      );
    }

    // Use Gemini API
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the RankWise AI Assistant, an expert academic counselor for EAMCET admissions.
You are currently helping a student who has the following simulator context:
Rank: ${context.rank || 'unknown'}, Category: ${context.category || 'unknown'}, Branch: ${context.branch || 'unknown'}, Region: ${context.region || 'unknown'}.
Current RankWise SQLite matches:
${databaseContext}
Keep your responses very concise (${AI_CONFIG.RESPONSE_LENGTH}), professional, and encouraging. Use bullet points if listing facts.
Do not hallucinate data. If the database context is insufficient, say what details are needed.`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.MODEL,
      contents: message,
      config: {
        systemInstruction,
        temperature: AI_CONFIG.TEMPERATURE
      }
    });

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: response.text,
        source: 'gemini',
        relatedColleges
      }, 'Response generated using AI')
    );
  } catch (error) {
    console.error('Chat Error:', error);

    // Fallback to local response if Gemini fails
    try {
      const { message = '' } = req.body || {};
      const relatedColleges = getRelatedColleges(message);
      const localReply = buildLocalAssistantReply(message, relatedColleges);

      return res.status(HTTP_STATUS.OK).json(
        successResponse({
          message: localReply,
          source: 'local-fallback',
          relatedColleges
        }, 'Using local AI due to service unavailability')
      );
    } catch (fallbackError) {
      console.error('Local Fallback Error:', fallbackError);
      return res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json(
        aiError(error)
      );
    }
  }
});

// 404 Handler - must be after all routes
app.use(notFoundHandler);

// Global Error Handler - must be last
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✓ Backend server running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Available endpoints:`);
  console.log(`  - POST /api/predict`);
  console.log(`  - GET /api/trends`);
  console.log(`  - POST /api/chat`);
});
