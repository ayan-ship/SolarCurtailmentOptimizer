/**
 * Get the Backend URL based on current environment
 * Production: https://solarcurtailmentoptimizer.onrender.com
 * Development: http://localhost:8080
 */
export const getBackendURL = () => {
  // Production (Vercel)
  if (window.location.hostname === 'solarcurtailmentoptimizer.vercel.app' ||
      window.location.hostname.includes('vercel.app')) {
    return 'https://solarcurtailmentoptimizer.onrender.com';
  }

  // Development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8080';
  }

  // Fallback to production
  return 'https://solarcurtailmentoptimizer.onrender.com';
};

/**
 * Get the Insight Backend URL based on current environment
 * Production: https://solarcurtailmentoptimizer-1.onrender.com
 * Development: http://localhost:5001
 */
export const getInsightBackendURL = () => {
  if (window.location.hostname === 'solarcurtailmentoptimizer.vercel.app' ||
      window.location.hostname.includes('vercel.app')) {
    return 'https://solarcurtailmentoptimizer-1.onrender.com';
  }

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5001';
  }

  return 'https://solarcurtailmentoptimizer-1.onrender.com';
};
