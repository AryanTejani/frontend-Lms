export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { logger } = await import('./src/lib/logger');

    logger.info('Frontend server started');
  }
}
