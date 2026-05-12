/**
 * Custom React Hooks for reusable logic
 * Performance optimization and common patterns
 */

import { useEffect, useRef, useCallback } from 'react';

/**
 * Debounce hook - delays function execution
 * Useful for search inputs, resize handlers, etc.
 * @param {function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} - Debounced function
 */
export const useDebounce = (callback, delay = 300) => {
  const timeoutRef = useRef(null);

  const debounced = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debounced;
};

/**
 * Throttle hook - limits function execution frequency
 * Useful for scroll handlers, window resize, etc.
 * @param {function} callback - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {function} - Throttled function
 */
export const useThrottle = (callback, delay = 300) => {
  const lastRunRef = useRef(Date.now());
  const timeoutRef = useRef(null);

  const throttled = useCallback((...args) => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRunRef.current;

    if (timeSinceLastRun >= delay) {
      callback(...args);
      lastRunRef.current = now;
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
        lastRunRef.current = Date.now();
      }, delay - timeSinceLastRun);
    }
  }, [callback, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttled;
};

/**
 * Previous value hook - get previous value of a prop/state
 * Useful for comparing old vs new values
 * @param {*} value - Current value
 * @returns {*} - Previous value
 */
export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

/**
 * Local storage hook - sync state with localStorage
 * @param {string} key - localStorage key
 * @param {*} initialValue - Initial value
 * @returns {array} - [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

/**
 * Async data hook - manage async data fetching
 * @param {function} asyncFunction - Async function to execute
 * @param {boolean} executeOnMount - Whether to execute on mount
 * @param {array} dependencies - Dependency array
 * @returns {object} - { data, loading, error, execute }
 */
export const useAsync = (asyncFunction, executeOnMount = true, dependencies = []) => {
  const [status, setStatus] = React.useState('idle');
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (executeOnMount) {
      execute();
    }
  }, [execute, executeOnMount, ...dependencies]);

  return {
    data,
    loading: status === 'pending',
    error,
    status,
    execute
  };
};

/**
 * Click outside hook - detect clicks outside element
 * Useful for closing modals, dropdowns, etc.
 * @param {ref} ref - Reference to element
 * @param {function} callback - Function to call on outside click
 */
export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default {
  useDebounce,
  useThrottle,
  usePrevious,
  useLocalStorage,
  useAsync,
  useClickOutside
};
