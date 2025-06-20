import express from 'express';
import cors from 'cors';
import { initializeSchema } from './database/schema';
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import servicesRoutes from './routes/services';
import clientsRoutes from './routes/clients';
import { errorHandler } from './middleware/errorHandler';
import { authRateLimiter, apiRateLimiter } from './middleware/rateLimiter';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database schema
initializeSchema().catch(console.error);

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://rusba-ng.netlify.app'
];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Apply rate limiters to specific route groups
app.use('/api/auth', authRateLimiter, authRoutes);

// Apply general API rate limiter to other routes
app.use('/api', apiRateLimiter);

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/clients', clientsRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
