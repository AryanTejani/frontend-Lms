import pino from 'pino';
import { mkdirSync } from 'fs';

const isServer = typeof window === 'undefined';

function createLogger(): pino.Logger {
  if (!isServer) {
    return pino({ level: 'silent' });
  }

  const logDir = process.env.LOG_DIR ?? '/var/www/app/tmp/traderlionApp';
  const level = process.env.NODE_ENV === 'production' ? 'warn' : 'debug';

  try {
    mkdirSync(logDir, { recursive: true });

    return pino(
      {
        level,
        timestamp: pino.stdTimeFunctions.isoTime,
      },
      pino.destination({
        dest: `${logDir}/frontend.log`,
        sync: false,
      })
    );
  } catch {
    console.warn(`[Logger] Could not create log directory "${logDir}", file logging disabled`);

    return pino({ level, timestamp: pino.stdTimeFunctions.isoTime });
  }
}

export const logger = createLogger();
