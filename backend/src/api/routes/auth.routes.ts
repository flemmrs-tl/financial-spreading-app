import { Router } from 'express';
import { login, register, getCurrentUser } from '../controllers/auth.controller';
import { jwtAuth } from '../../middleware/jwtAuth';

const router = Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login a user and get token
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user information
 * @access  Private
 */
router.get('/me', jwtAuth, getCurrentUser);

export const authRoutes = router;