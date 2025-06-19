import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getAllClients, createClient, updateClient, deleteClient } from '../controllers/clients';

const router = express.Router();

// Public route
router.get('/', getAllClients);

// Protected routes
router.post('/', authenticateToken, createClient);
router.put('/:id', authenticateToken, updateClient);
router.delete('/:id', authenticateToken, deleteClient);

export default router;
