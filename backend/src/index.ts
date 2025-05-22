import { app } from './app';
import { logger } from './utils/logger';
import { config } from './config';

const startServer = () => {
  try {
    const PORT = config.server.port;

    const server = app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT} in ${config.environment} mode`);
      logger.info(`API Documentation available at /api/docs`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();