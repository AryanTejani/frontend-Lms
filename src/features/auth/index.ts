// Public API for auth feature
export * from './client';
export * from './schemas';
export * from './types';
export * from './views';

// Server exports should be imported directly from './server' to ensure proper code splitting
// import { getSession, isAuthenticated } from '@/features/auth/server';
