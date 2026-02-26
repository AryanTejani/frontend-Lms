export const env = {
  API_URL: process.env['NEXT_PUBLIC_API_URL'] ?? '',
  APP_URL: process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000',
  STRIPE_PUBLISHABLE_KEY: process.env['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'] ?? '',
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
} as const;
