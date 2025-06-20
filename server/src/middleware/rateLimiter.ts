import rateLimit from 'express-rate-limit';

// Strict limiter for authentication routes
export const authRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 login attempts per hour
    message: 'Too many login attempts. Please try again after an hour.'
});

// General API rate limiter (more lenient)
export const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per 15 minutes
    message: 'Too many requests. Please try again later.'
});
