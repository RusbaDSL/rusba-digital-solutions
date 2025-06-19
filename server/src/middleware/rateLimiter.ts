import rateLimit from 'express-rate-limit';

// Create a limiter that allows 3 requests per hour per IP
export const rateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 requests per windowMs
    message: 'Too many login attempts. Please try again after an hour.'
});
