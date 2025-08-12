import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { Resend } from 'resend';
import contactRoutes from './routes/contact';
import { errorHandler } from './middleware/errorHandler';
import { apiRateLimiter } from './middleware/rateLimiter';

// Load environment variables from the server directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });
console.log('Loading .env from:', path.join(__dirname, '..', '.env'));

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;
console.log('Resend API Key length:', resendApiKey ? resendApiKey.length : 'undefined');
console.log('Resend API Key starts with "re_":', resendApiKey ? resendApiKey.startsWith('re_') : false);

let resend: Resend | null = null;
if (resendApiKey && resendApiKey !== 're_placeholder_get_your_key_from_resend_dashboard') {
    resend = new Resend(resendApiKey);
    console.log('✅ Resend initialized successfully');
} else {
    console.log('⚠️ Resend not initialized - running in dev mode');
    console.log('API key present:', !!resendApiKey);
    console.log('API key is placeholder:', resendApiKey === 're_placeholder_get_your_key_from_resend_dashboard');
}

const app = express();
const PORT = process.env.PORT || 5100;

// Trust proxy - needed for Render.com
app.set('trust proxy', 1);

// CORS configuration - simplified and more reliable
const corsOptions = {
    origin: ['http://localhost:3000', 'https://rusba-ng.netlify.app', 'https://rusbadsl.com.ng'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
};

console.log('Configured CORS origins:', corsOptions.origin);
console.log('Server will run on port:', PORT);

// Apply CORS before any other middleware
app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} from ${req.headers.origin || 'unknown origin'}`);
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Apply general API rate limiter to contact route
app.use('/api', apiRateLimiter);

// Routes - pass the Resend instance to contact routes
app.use('/api/contact', contactRoutes(resend));

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
