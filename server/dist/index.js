"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const schema_1 = require("./database/schema");
const auth_1 = __importDefault(require("./routes/auth"));
const products_1 = __importDefault(require("./routes/products"));
const services_1 = __importDefault(require("./routes/services"));
const clients_1 = __importDefault(require("./routes/clients"));
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Initialize database schema
(0, schema_1.initializeSchema)().catch(console.error);
// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Apply rate limiters to specific route groups
app.use('/api/auth', rateLimiter_1.authRateLimiter, auth_1.default);
// Apply general API rate limiter to other routes
app.use('/api', rateLimiter_1.apiRateLimiter);
// Routes
app.use('/api/products', products_1.default);
app.use('/api/services', services_1.default);
app.use('/api/clients', clients_1.default);
// Error handling
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
