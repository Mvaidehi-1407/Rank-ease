/**
 * React Hooks for Form Validation
 * Provides reusable validation logic for form fields
 */

import { useState, useCallback } from 'react';

/**
 * Hook for validating a single field
 * @param {string} initialValue - Initial field value
 * @param {function} validator - Validation function (returns error message or null)
 * @returns {object} - { value, setValue, error, validate, isValid, reset }
 */
export const useField = (initialValue = '', validator = null) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);

  const validate = useCallback(() => {
    if (!validator) return true;
    const errorMsg = validator(value);
    setError(errorMsg);
    return !errorMsg;
  }, [value, validator]);

  const isValid = !error && value !== '';

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
  }, [initialValue]);

  return {
    value,
    setValue,
    error,
    validate,
    isValid,
    reset
  };
};

/**
 * Hook for managing multiple form fields
 * @param {object} initialValues - Object with field names and values
 * @param {object} validators - Object with field names and validator functions
 * @returns {object} - { fields, setField, errors, validate, isFormValid, resetForm }
 */
export const useForm = (initialValues = {}, validators = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const setField = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};

    for (const [fieldName, validator] of Object.entries(validators)) {
      if (validator) {
        const errorMsg = validator(values[fieldName]);
        if (errorMsg) {
          newErrors[fieldName] = errorMsg;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validators]);

  const isFormValid = Object.keys(errors).length === 0 && Object.keys(values).length > 0;

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    fields: values,
    setField,
    errors,
    validate,
    isFormValid,
    resetForm
  };
};

/**
 * Validator functions
 */

export const validators = {
  /**
   * Validate email format
   */
  email: (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email format';
  },

  /**
   * Validate password strength
   */
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain uppercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain number';
    return null;
  },

  /**
   * Validate number is within range
   */
  range: (min, max) => (value) => {
    const num = Number(value);
    if (isNaN(num)) return `Must be a number`;
    if (num < min) return `Must be at least ${min}`;
    if (num > max) return `Must be at most ${max}`;
    return null;
  },

  /**
   * Validate required field
   */
  required: (value) => {
    return !value || value.toString().trim() === '' ? 'This field is required' : null;
  },

  /**
   * Validate minimum length
   */
  minLength: (length) => (value) => {
    return value && value.toString().length >= length ? null : `Must be at least ${length} characters`;
  },

  /**
   * Validate maximum length
   */
  maxLength: (length) => (value) => {
    return value && value.toString().length <= length ? null : `Must not exceed ${length} characters`;
  }
};

export default {
  useField,
  useForm,
  validators
};
