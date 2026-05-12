/**
 * Rate Limiting Middleware
 * Prevents abuse and excessive requests to API endpoints
 */

import { HTTP_STATUS } from './constants.js';
import { errorResponse } from './responses.js';

/**
 * Simple in-memory rate limiter
 * Can be replaced with Redis for production
 */
class RateLimiter {
  constructor(maxRequests = 100, windowMs = 15 * 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  /**
   * Check if request should be allowed
   * @param {string} identifier - Unique identifier (IP address, user ID, etc.)
   * @returns {object} - { allowed: boolean, remaining: number, resetTime: timestamp }
   */
  isAllowed(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const recentRequests = userRequests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    if (recentRequests.length >= this.maxRequests) {
      // Calculate when the oldest request expires
      const resetTime = recentRequests[0] + this.windowMs;
      return {
        allowed: false,
        remaining: 0,
        resetTime
      };
    }

    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);

    return {
      allowed: true,
      remaining: this.maxRequests - recentRequests.length,
      resetTime: now + this.windowMs
    };
  }

  /**
   * Reset rate limiter for a specific identifier
   * @param {string} identifier - Unique identifier
   */
  reset(identifier) {
    this.requests.delete(identifier);
  }

  /**
   * Clear all rate limit data
   */
  clear() {
    this.requests.clear();
  }
}

// Create default rate limiter instances for different endpoints
const generalLimiter = new RateLimiter(100, 15 * 60 * 1000); // 100 requests per 15 minutes
const apiLimiter = new RateLimiter(1000, 60 * 60 * 1000); // 1000 requests per hour
const authLimiter = new RateLimiter(5, 60 * 1000); // 5 attempts per minute

/**
 * Middleware to apply rate limiting
 * @param {RateLimiter} limiter - Rate limiter instance
 * @param {string} message - Custom error message
 * @returns {function} - Express middleware
 */
export const rateLimit = (limiter = generalLimiter, message = 'Too many requests') => {
  return (req, res, next) => {
    // Get identifier (IP address or user ID)
    const identifier = req.ip || req.connection.remoteAddress || 'unknown';

    const result = limiter.isAllowed(identifier);

    // Set rate limit headers
    res.set('X-RateLimit-Limit', limiter.maxRequests);
    res.set('X-RateLimit-Remaining', result.remaining);
    res.set('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000));

    if (!result.allowed) {
      return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json(
        errorResponse(
          HTTP_STATUS.TOO_MANY_REQUESTS,
          'RATE_LIMIT_EXCEEDED',
          message,
          {
            retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
          }
        )
      );
    }

    next();
  };
};

/**
 * Get rate limiter statistics (for monitoring)
 * @param {RateLimiter} limiter - Rate limiter instance
 * @returns {object} - Statistics
 */
export const getRateLimiterStats = (limiter) => {
  return {
    totalTrackedIdentifiers: limiter.requests.size,
    maxRequests: limiter.maxRequests,
    windowMs: limiter.windowMs,
    requests: Array.from(limiter.requests.entries()).map(([id, reqs]) => ({
      identifier: id,
      requestCount: reqs.length
    }))
  };
};

export {
  RateLimiter,
  generalLimiter,
  apiLimiter,
  authLimiter
};
