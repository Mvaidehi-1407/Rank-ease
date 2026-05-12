/**
 * Utility Functions for common operations
 * Reusable logic for formatting, validation, etc.
 */

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
  if (!num && num !== 0) return '-';
  return num.toLocaleString();
};

/**
 * Truncate text to maximum length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

/**
 * Debounce function - execute function after delay
 * @param {function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if value is empty
 * @param {*} value - Value to check
 * @returns {boolean} - True if empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Deep clone an object
 * @param {object} obj - Object to clone
 * @returns {object} - Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Get unique items from array
 * @param {array} arr - Array to filter
 * @param {string} key - Key to check uniqueness (for objects)
 * @returns {array} - Unique items
 */
export const getUnique = (arr, key = null) => {
  if (!Array.isArray(arr)) return [];
  
  if (!key) {
    return [...new Set(arr)];
  }
  
  const seen = new Set();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
};

/**
 * Sort array of objects
 * @param {array} arr - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {array} - Sorted array
 */
export const sortBy = (arr, key, order = 'asc') => {
  if (!Array.isArray(arr)) return [];
  
  const sorted = [...arr].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
};

/**
 * Filter array by multiple criteria
 * @param {array} arr - Array to filter
 * @param {object} criteria - Filtering criteria { key: value }
 * @returns {array} - Filtered array
 */
export const filterBy = (arr, criteria) => {
  if (!Array.isArray(arr)) return [];
  
  return arr.filter(item => {
    return Object.entries(criteria).every(([key, value]) => {
      return item[key] === value;
    });
  });
};

/**
 * Group array items by key
 * @param {array} arr - Array to group
 * @param {string} key - Key to group by
 * @returns {object} - Grouped object
 */
export const groupBy = (arr, key) => {
  if (!Array.isArray(arr)) return {};
  
  return arr.reduce((groups, item) => {
    const groupKey = item[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
};

/**
 * Parse query string to object
 * @param {string} queryString - Query string from URL
 * @returns {object} - Parsed query object
 */
export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  const obj = {};
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }
  return obj;
};

/**
 * Generate query string from object
 * @param {object} obj - Object to convert
 * @returns {string} - Query string
 */
export const generateQueryString = (obj) => {
  return new URLSearchParams(obj).toString();
};

export default {
  formatNumber,
  truncateText,
  debounce,
  isEmpty,
  deepClone,
  getUnique,
  sortBy,
  filterBy,
  groupBy,
  parseQueryString,
  generateQueryString
};
