/**
 * Frontend API Service Layer
 * Handles all communication with the backend API
 * Provides standardized error handling and response processing
 */

import { API_ENDPOINTS, ERROR_MESSAGES } from '../constants.js';

/**
 * Handle API response and standardize errors
 * @param {Response} response - Fetch API response object
 * @returns {object} - Processed response data or error object
 */
const handleResponse = async (response) => {
  let data;

  try {
    data = await response.json();
  } catch (e) {
    throw {
      success: false,
      code: 'PARSE_ERROR',
      message: 'Failed to parse server response',
      status: response.status
    };
  }

  // Check if response indicates success or error
  if (!response.ok || !data.success) {
    const error = {
      success: false,
      code: data.code || 'UNKNOWN_ERROR',
      message: data.message || ERROR_MESSAGES.SERVER_ERROR,
      status: response.status,
      details: data.details
    };
    throw error;
  }

  return data;
};

/**
 * Make API request with standardized error handling
 * @param {string} endpoint - API endpoint URL
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {object} - Response data or error object
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    return await handleResponse(response);
  } catch (error) {
    // Network error or JSON parsing error
    if (error instanceof TypeError) {
      throw {
        success: false,
        code: 'NETWORK_ERROR',
        message: ERROR_MESSAGES.NETWORK_ERROR
      };
    }

    // Re-throw API errors
    throw error;
  }
};

/**
 * Get college predictions
 * @param {object} filters - { rank, category, gender, region, branch }
 * @returns {object} - { success, data, error }
 */
export const getPredictions = async (filters) => {
  try {
    const response = await apiRequest(API_ENDPOINTS.PREDICT, {
      method: 'POST',
      body: JSON.stringify(filters)
    });

    return {
      success: true,
      data: response.data || [],
      message: response.message
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || ERROR_MESSAGES.SERVER_ERROR,
      code: error.code,
      details: error.details
    };
  }
};

/**
 * Get trends data
 * @returns {object} - { success, data, error }
 */
export const getTrends = async () => {
  try {
    const response = await apiRequest(API_ENDPOINTS.TRENDS, {
      method: 'GET'
    });

    return {
      success: true,
      data: response.data || [],
      message: response.message
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || ERROR_MESSAGES.SERVER_ERROR,
      code: error.code
    };
  }
};

/**
 * Send chat message to AI assistant
 * @param {string} message - User message
 * @param {object} context - Optional context (rank, category, etc.)
 * @returns {object} - { success, data, error }
 */
export const sendChat = async (message, context = {}) => {
  try {
    const response = await apiRequest(API_ENDPOINTS.CHAT, {
      method: 'POST',
      body: JSON.stringify({ message, context })
    });

    return {
      success: true,
      data: response.data || {},
      message: response.data?.message,
      source: response.data?.source,
      relatedColleges: response.data?.relatedColleges
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || ERROR_MESSAGES.SERVER_ERROR,
      code: error.code
    };
  }
};

/**
 * Validate response from API
 * @param {object} response - Response object to validate
 * @returns {boolean} - True if response is valid
 */
export const isValidResponse = (response) => {
  return response && typeof response === 'object' && response.success === true;
};

/**
 * Extract error message from API response
 * @param {object} error - Error object
 * @returns {string} - Error message
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.details?.validation) return error.details.validation;
  return ERROR_MESSAGES.SERVER_ERROR;
};

export default {
  getPredictions,
  getTrends,
  sendChat,
  isValidResponse,
  getErrorMessage
};
