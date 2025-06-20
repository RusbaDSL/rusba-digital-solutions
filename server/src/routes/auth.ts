import express from 'express';
import { login } from '../controllers/auth';
import { authRateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Apply rate limiter to login route
router.post('/login', authRateLimiter, login);

export default router;
