import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { config } from './config';
import { authRoutes } from './api/routes/auth.routes';
import { userRoutes } from './api/routes/user.routes';
import { documentRoutes } from './api/routes/document.routes';
import { clientRoutes } from './api/routes/client.routes';
import { financialStatementRoutes } from './api/routes/financialStatement.routes';
import { apiKeyAuth } from './middleware/apiKeyAuth';
import { jwtAuth } from './middleware/jwtAuth';

// Initialize Express app
const app: Express = express();

// Apply middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(cors({ origin: config.corsAllowedOrigins })); // CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging in development mode
if (config.environment === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', environment: config.environment });
});

// API routes
app.use('/api/auth', authRoutes);

// Protected routes - require authentication
app.use('/api/users', jwtAuth, userRoutes);
app.use('/api/documents', jwtAuth, documentRoutes);
app.use('/api/clients', jwtAuth, clientRoutes);
app.use('/api/financial-statements', jwtAuth, financialStatementRoutes);

// API routes for external integrations - require API key
app.use('/api/external', apiKeyAuth, (req: Request, res: Response) => {
  res.json({ message: 'External API access granted' });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export { app };