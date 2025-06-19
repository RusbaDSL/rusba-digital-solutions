import express from 'express';
import { login } from '../controllers/auth';
import { rateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Apply rate limiter to login route
router.post('/login', rateLimiter, login);

export default router;
