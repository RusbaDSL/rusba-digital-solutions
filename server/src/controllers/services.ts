import { Request, Response } from 'express';
import { dbOperations } from '../database/operations';
import type { AuthRequest } from '../middleware/auth';

export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await dbOperations.getAllServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services' });
    }
};

export const createService = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, icon } = req.body;
        if (!title || !description || !icon) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const newService = await dbOperations.createService({ title, description, icon });
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service' });
    }
};

export const updateService = async (req: AuthRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description, icon } = req.body;
        
        const success = await dbOperations.updateService(id, { title, description, icon });
        if (!success) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        const updatedService = await dbOperations.getServiceById(id);
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service' });
    }
};

export const deleteService = async (req: AuthRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const success = await dbOperations.deleteService(id);
        
        if (!success) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service' });
    }
};
