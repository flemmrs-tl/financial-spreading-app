import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const config = {
  environment: getEnv('NODE_ENV', 'development'),
  server: {
    port: parseInt(getEnv('PORT', '3000'), 10),
  },
  database: {
    url: getEnv('DATABASE_URL'),
  },
  jwt: {
    secret: getEnv('JWT_SECRET'),
    expiresIn: getEnv('JWT_EXPIRES_IN', '24h'),
  },
  upload: {
    directory: getEnv('UPLOAD_DIRECTORY', './uploads'),
    maxFileSize: parseInt(getEnv('MAX_FILE_SIZE', '10485760'), 10), // 10MB
  },
  logging: {
    level: getEnv('LOG_LEVEL', 'info'),
  },
  corsAllowedOrigins: getEnv('CORS_ALLOWED_ORIGINS', 'http://localhost:8080').split(','),
  ocr: {
    apiEndpoint: getEnv('OCR_API_ENDPOINT', ''),
    apiKey: getEnv('OCR_API_KEY', ''),
  },
  isDevelopment: () => config.environment === 'development',
  isProduction: () => config.environment === 'production',
  isTest: () => config.environment === 'test',
};