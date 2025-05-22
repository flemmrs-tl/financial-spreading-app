import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../middleware/errorHandler';
import { config } from '../../config';
import { logger } from '../../utils/logger';

const prisma = new PrismaClient();

/**
 * Login a user and return a JWT token
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return next(new ApiError(400, 'Email and password are required'));
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      return next(new ApiError(401, 'Invalid credentials'));
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return next(new ApiError(401, 'Invalid credentials'));
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Update last login timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Log successful login
    logger.info(`User logged in: ${user.email}`);

    // Return token and user info
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: {
          id: user.role.id,
          name: user.role.name,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return next(new ApiError(400, 'Username, email, and password are required'));
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      return next(new ApiError(409, 'User with this email or username already exists'));
    }

    // Find default role (e.g., 'user')
    const defaultRole = await prisma.role.findFirst({
      where: { name: 'user' },
    });

    if (!defaultRole) {
      return next(new ApiError(500, 'Default role not found'));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        firstName,
        lastName,
        roleId: defaultRole.id,
      },
      include: {
        role: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Log user creation
    logger.info(`New user registered: ${user.email}`);

    // Return token and user info
    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: {
          id: user.role.id,
          name: user.role.name,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Get current user info
 */
export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        role: true,
      },
    });

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    return res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: {
        id: user.role.id,
        name: user.role.name,
      },
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    });
  } catch (error) {
    return next(error);
  }
};