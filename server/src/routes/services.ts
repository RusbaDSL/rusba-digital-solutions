import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getAllServices, createService, updateService, deleteService } from '../controllers/services';

const router = express.Router();

// Public route
router.get('/', getAllServices);

// Protected routes
router.post('/', authenticateToken, createService);
router.put('/:id', authenticateToken, updateService);
router.delete('/:id', authenticateToken, deleteService);

export default router;
