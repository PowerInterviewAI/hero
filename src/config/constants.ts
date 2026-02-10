/**
 * Application Configuration
 */

export const APP_CONFIG = {
  name: 'Power Interview Hero',
  description: 'Your interview preparation companion',
  version: '0.1.0',
  author: 'Your Name',
  repository: 'https://github.com/yourusername/power-interview-hero',
} as const;

/**
 * Environment Variables
 */
export const ENV = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
} as const;

/**
 * Route Constants
 */
export const ROUTES = {
  home: '/',
  about: '/about',
  contact: '/contact',
} as const;
