// Logging system configuration for sellor.ai
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: process.env.LOG_FORMAT === 'pretty' ? { colorize: true } : false,
  base: null, // Remove pid and hostname
  timestamp: () => `,"time":"${new Date().toISOString()}"`
});

// Log Levels
class LogLevels {
  static debug(message: string, metadata?: Record<string, any>) {
    logger.debug(metadata, message);
  }

  static info(message: string, metadata?: Record<string, any>) {
    logger.info(metadata, message);
  }

  static warn(message: string, metadata?: Record<string, any>) {
    logger.warn(metadata, message);
  }

  static error(message: string, metadata?: Record<string, any>) {
    logger.error(metadata, message);
  }

  static fatal(message: string, metadata?: Record<string, any>) {
    logger.fatal(metadata, message);
  }
}

export { logger, LogLevels };