/**
 * Standardized API Response Format
 * Ensures consistent response structure across all endpoints
 */

import { HTTP_STATUS, ERROR_CODES, RESPONSE_MESSAGES } from './constants.js';

/**
 * Standard success response format
 * @param {object} data - Response data
 * @param {string} message - Optional success message
 * @returns {object} - Standardized response
 */
export const successResponse = (data, message = RESPONSE_MESSAGES.SUCCESS) => {
  return {
    success: true,
    status: HTTP_STATUS.OK,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

/**
 * Standard error response format
 * @param {number} statusCode - HTTP status code
 * @param {string} code - Error code
 * @param {string} message - Error message
 * @param {object} details - Optional error details
 * @returns {object} - Standardized error response
 */
export const errorResponse = (statusCode, code, message, details = null) => {
  return {
    success: false,
    status: statusCode,
    code,
    message,
    details,
    timestamp: new Date().toISOString()
  };
};

/**
 * Validation error response
 * @param {string} message - Validation error message
 * @returns {object} - Validation error response
 */
export const validationError = (message) => {
  return errorResponse(
    HTTP_STATUS.BAD_REQUEST,
    ERROR_CODES.VALIDATION_ERROR,
    RESPONSE_MESSAGES.ERROR_INVALID_PARAMS,
    { validation: message }
  );
};

/**
 * Database error response
 * @param {Error} error - Error object
 * @returns {object} - Database error response
 */
export const databaseError = (error) => {
  console.error('Database Error:', error.message);
  return errorResponse(
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ERROR_CODES.DB_ERROR,
    RESPONSE_MESSAGES.ERROR_DB,
    process.env.NODE_ENV === 'development' ? { error: error.message } : undefined
  );
};

/**
 * AI service error response
 * @param {Error} error - Error object
 * @returns {object} - AI error response
 */
export const aiError = (error) => {
  console.error('AI Service Error:', error.message);
  return errorResponse(
    HTTP_STATUS.SERVICE_UNAVAILABLE,
    ERROR_CODES.AI_ERROR,
    RESPONSE_MESSAGES.ERROR_AI,
    process.env.NODE_ENV === 'development' ? { error: error.message } : undefined
  );
};

/**
 * Generic internal error response
 * @param {string} message - Custom error message
 * @param {Error} error - Error object
 * @returns {object} - Internal error response
 */
export const internalError = (message = RESPONSE_MESSAGES.ERROR_INTERNAL, error) => {
  if (error) {
    console.error('Internal Error:', error.message);
  }
  return errorResponse(
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ERROR_CODES.INTERNAL_ERROR,
    message,
    process.env.NODE_ENV === 'development' ? { error: error?.message } : undefined
  );
};

/**
 * Missing parameters response
 * @param {Array} missingFields - List of missing field names
 * @returns {object} - Missing parameters error response
 */
export const missingParamsError = (missingFields = []) => {
  return errorResponse(
    HTTP_STATUS.BAD_REQUEST,
    ERROR_CODES.MISSING_PARAMS,
    RESPONSE_MESSAGES.ERROR_MISSING_PARAMS,
    { missingFields }
  );
};

export default {
  successResponse,
  errorResponse,
  validationError,
  databaseError,
  aiError,
  internalError,
  missingParamsError
};
