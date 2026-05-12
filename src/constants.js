/**
 * Frontend Constants & Configuration
 * Centralized configuration for frontend application
 */

// API Configuration
export const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  PREDICT: `${API_BASE_URL}/predict`,
  TRENDS: `${API_BASE_URL}/trends`,
  CHAT: `${API_BASE_URL}/chat`
};

// HTTP Headers
export const HTTP_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  APPLICATION_JSON: 'application/json'
};

// EAMCET Categories
export const CATEGORIES = {
  OC: { label: 'OC', value: 'OC' },
  BC_A: { label: 'BC-A', value: 'BC-A' },
  BC_B: { label: 'BC-B', value: 'BC-B' },
  BC_C: { label: 'BC-C', value: 'BC-C' },
  BC_D: { label: 'BC-D', value: 'BC-D' },
  BC_E: { label: 'BC-E', value: 'BC-E' },
  SC: { label: 'SC', value: 'SC' },
  ST: { label: 'ST', value: 'ST' }
};

export const CATEGORIES_ARRAY = Object.values(CATEGORIES);

// Engineering Branches
export const BRANCHES = {
  CSE: { label: 'CSE', value: 'CSE' },
  ECE: { label: 'ECE', value: 'ECE' },
  IT: { label: 'IT', value: 'IT' },
  EEE: { label: 'EEE', value: 'EEE' },
  MECH: { label: 'MECH', value: 'MECH' },
  CIVIL: { label: 'CIVIL', value: 'CIVIL' }
};

export const BRANCHES_ARRAY = Object.values(BRANCHES);

// University Regions
export const REGIONS = {
  OU: { label: 'OU', value: 'OU' },
  AU: { label: 'AU', value: 'AU' },
  SVU: { label: 'SVU', value: 'SVU' },
  NON_LOCAL: { label: 'Non-Local', value: 'Non-Local' }
};

export const REGIONS_ARRAY = Object.values(REGIONS);

// Gender Categories
export const GENDERS = {
  BOYS: { label: 'Boys/Co-Ed', value: 'Boys' },
  GIRLS: { label: 'Girls Only', value: 'Girls' }
};

export const GENDERS_ARRAY = Object.values(GENDERS);

// Prediction Status Colors
export const STATUS_COLORS = {
  Safe: 'accent', // Green
  Target: 'yellow-500',
  Dream: 'red-500'
};

// Form Constraints
export const FORM_CONSTRAINTS = {
  RANK_MIN: 100,
  RANK_MAX: 150000,
  RANK_STEP: 100,
  RANK_DEFAULT: 5000
};

// Navigation Routes
export const ROUTES = {
  HOME: '/home',
  PREDICTOR: '/predictor',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  SAVED_COLLEGES: '/saved-colleges',
  PRIVACY: '/privacy',
  LOGIN: '/login',
  LOGO_SPLASH: '/logo'
};

// UI States
export const UI_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_RESPONSE: 'Invalid response format from server.',
  MISSING_FIELDS: 'Please fill in all required fields.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PREDICTIONS_LOADED: 'College predictions loaded successfully',
  CHAT_SENT: 'Message sent successfully',
  DATA_SAVED: 'Your data has been saved'
};

// Default Filter Values
export const DEFAULT_FILTERS = {
  rank: FORM_CONSTRAINTS.RANK_DEFAULT,
  category: 'OC',
  branch: 'CSE',
  region: 'OU',
  gender: 'Boys'
};

// Animation Timing (in ms)
export const ANIMATION_TIMINGS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  DEBOUNCE_FILTERS: 300
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_LOGIN: 'isLoggedIn',
  SAVED_FILTERS: 'savedFilters',
  THEME_PREFERENCE: 'themePreference'
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  CATEGORIES,
  CATEGORIES_ARRAY,
  BRANCHES,
  BRANCHES_ARRAY,
  REGIONS,
  REGIONS_ARRAY,
  GENDERS,
  GENDERS_ARRAY,
  STATUS_COLORS,
  FORM_CONSTRAINTS,
  ROUTES,
  UI_STATES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEFAULT_FILTERS,
  ANIMATION_TIMINGS,
  STORAGE_KEYS
};
