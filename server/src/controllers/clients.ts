import { Request, Response } from 'express';
import { dbOperations } from '../database/operations';
import type { AuthRequest } from '../middleware/auth';

export const getAllClients = async (req: Request, res: Response) => {
    try {
        const clients = await dbOperations.getAllClients();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching clients' });
    }
};

export const createClient = async (req: AuthRequest, res: Response) => {
    try {
        const { name, logo } = req.body;
        if (!name || !logo) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const newClient = await dbOperations.createClient({ name, logo });
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: 'Error creating client' });
    }
};

export const updateClient = async (req: AuthRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name, logo } = req.body;
        
        const success = await dbOperations.updateClient(id, { name, logo });
        if (!success) {
            return res.status(404).json({ message: 'Client not found' });
        }
        
        const updatedClient = await dbOperations.getClientById(id);
        res.json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: 'Error updating client' });
    }
};

export const deleteClient = async (req: AuthRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const success = await dbOperations.deleteClient(id);
        
        if (!success) {
            return res.status(404).json({ message: 'Client not found' });
        }
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting client' });
    }
};
