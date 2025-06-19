import { Request, Response } from 'express';
import { dbOperations } from '../database/operations';
import type { AuthRequest } from '../middleware/auth';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await dbOperations.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
    try {
        const { name, description, image, features, video_url } = req.body;
        if (!name || !description || !image || !features) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const newProduct = await dbOperations.createProduct({ 
            name, 
            description, 
            image, 
            features,
            video_url 
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description, image, features, video_url } = req.body;
        
        const success = await dbOperations.updateProduct(id, { 
            name, 
            description, 
            image, 
            features,
            video_url 
        });
        if (!success) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        const updatedProduct = await dbOperations.getProductById(id);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const success = await dbOperations.deleteProduct(id);
        
        if (!success) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};
