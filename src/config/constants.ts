/**
 * Application Configuration
 */

export const APP_CONFIG = {
  name: 'Power Interview Hero',
  description: 'Your ultimate interview coaching companion',
  version: '0.10.0',
  author: 'Alpha Dev',
  repository: 'https://github.com/PowerInterviewAI/hero.git',
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
