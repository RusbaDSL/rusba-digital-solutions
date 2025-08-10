"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const resend_1 = require("resend");
const contact_1 = __importDefault(require("./routes/contact"));
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
// Load environment variables from the server directory
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', '.env') });
console.log('Loading .env from:', path_1.default.join(__dirname, '..', '.env'));
// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;
console.log('Resend API Key length:', resendApiKey ? resendApiKey.length : 'undefined');
console.log('Resend API Key starts with "re_":', resendApiKey ? resendApiKey.startsWith('re_') : false);
let resend = null;
if (resendApiKey && resendApiKey !== 're_placeholder_get_your_key_from_resend_dashboard') {
    resend = new resend_1.Resend(resendApiKey);
    console.log('✅ Resend initialized successfully');
}
else {
    console.log('⚠️ Resend not initialized - running in dev mode');
    console.log('API key present:', !!resendApiKey);
    console.log('API key is placeholder:', resendApiKey === 're_placeholder_get_your_key_from_resend_dashboard');
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5100;
// Trust proxy - needed for Render.com
app.set('trust proxy', 1);
// CORS configuration - simplified and more reliable
const corsOptions = {
    origin: ['http://localhost:3000', 'https://rusba-ng.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
};
console.log('Configured CORS origins:', corsOptions.origin);
console.log('Server will run on port:', PORT);
// Apply CORS before any other middleware
app.use((0, cors_1.default)(corsOptions));
// Explicitly handle preflight OPTIONS requests
app.options('*', (0, cors_1.default)(corsOptions));
// Body parsing middleware
app.use(express_1.default.json());
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
app.use('/api', rateLimiter_1.apiRateLimiter);
// Routes - pass the Resend instance to contact routes
app.use('/api/contact', (0, contact_1.default)(resend));
// Error handling
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
