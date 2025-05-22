import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { ApiError } from './errorHandler';
import { logger } from '../utils/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
}

// Extend Express Request interface to include user object
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        email: string;
        roleId: string;
      };
    }
  }
}

export const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new ApiError(401, 'Authentication required. Please provide a valid token'));
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the token
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      
      // Find the user in the database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          username: true,
          email: true,
          roleId: true,
        },
      });
      
      if (!user) {
        return next(new ApiError(401, 'User associated with token no longer exists'));
      }
      
      // Attach user to request object
      req.user = user;
      
      // Update last login timestamp
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
      
      return next();
    } catch (error) {
      logger.warn('JWT verification failed', { error });
      return next(new ApiError(401, 'Invalid or expired token'));
    }
  } catch (error) {
    return next(error);
  }
};