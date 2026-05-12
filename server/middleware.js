/**
 * Backend Middleware for Error Handling & Request Validation
 * Provides centralized error handling and request validation
 */

import { HTTP_STATUS } from './constants.js';
import {
  errorResponse,
  missingParamsError,
  validationError
} from './responses.js';

/**
 * Global error handler middleware
 * Should be added at the end of all routes
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err.message);

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const errorCode = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'An unexpected error occurred';

  res.status(statusCode).json(
    errorResponse(statusCode, errorCode, message)
  );
};

/**
 * Request validation middleware
 * Validates that request has required fields
 */
export const validateRequest = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(missingParamsError(missingFields));
    }

    next();
  };
};

/**
 * Request sanitization middleware
 * Trims and validates string fields
 */
export const sanitizeRequest = (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = req.body[key].trim();
    }
  }
  next();
};

/**
 * CORS error handler
 * Handles CORS-related errors
 */
export const corsErrorHandler = (err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(HTTP_STATUS.FORBIDDEN).json(
      errorResponse(
        HTTP_STATUS.FORBIDDEN,
        'CORS_ERROR',
        'Cross-Origin Request Blocked',
        { origin: req.headers.origin }
      )
    );
  } else {
    next(err);
  }
};

/**
 * 404 handler
 * Handles requests to non-existent routes
 */
export const notFoundHandler = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json(
    errorResponse(
      HTTP_STATUS.NOT_FOUND,
      'NOT_FOUND',
      `Route ${req.originalUrl} not found`,
      { method: req.method, path: req.originalUrl }
    )
  );
};

/**
 * Request logger middleware
 * Logs all incoming requests
 */
export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${path} from ${ip}`);

  // Log response time
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${method} ${path} completed in ${duration}ms with status ${res.statusCode}`);
  });

  next();
};

export default {
  errorHandler,
  validateRequest,
  sanitizeRequest,
  corsErrorHandler,
  notFoundHandler,
  requestLogger
};
