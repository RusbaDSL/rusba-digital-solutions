import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products';

const router = express.Router();

// Public route
router.get('/', getAllProducts);

// Protected routes
router.post('/', authenticateToken, createProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;
