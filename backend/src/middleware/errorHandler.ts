import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { config } from '../config';

// Custom API error class
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Central error handling middleware
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // Default to 500 server error
  let statusCode = 500;
  let message = 'Internal Server Error';
  let stack;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    
    // Only log operational errors as warnings, programming errors as errors
    if (err.isOperational) {
      logger.warn(`Operational error: ${err.message}`);
    } else {
      logger.error(`Programming error: ${err.message}`, { stack: err.stack });
    }
  } else {
    // Unexpected error
    logger.error(`Unexpected error: ${err.message}`, { stack: err.stack });
  }

  // Include stack trace in development mode
  if (!config.isProduction()) {
    stack = err.stack;
  }

  // Send the error response
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(stack && { stack }),
  });
};