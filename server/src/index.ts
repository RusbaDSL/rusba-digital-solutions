import express from 'express';
import cors from 'cors';
import { initializeSchema } from './database/schema';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import servicesRoutes from './routes/services';
import productsRoutes from './routes/products';
import clientsRoutes from './routes/clients';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/clients', clientsRoutes);

// Error handling middleware - must be last
app.use(errorHandler);

// Initialize database and start server
const start = async () => {
    try {
        await initializeSchema();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

start();
