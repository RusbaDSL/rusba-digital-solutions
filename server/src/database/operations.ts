import { dbAsync } from './config';

export interface User {
    id: number;
    username: string;
    password: string;
    role: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    video_url?: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    video_url?: string;
    features: string;
}

export interface Client {
    id: number;
    name: string;
    logo: string;
}

export const dbOperations = {
    // User operations
    getUserByUsername: async (username: string): Promise<User | undefined> => {
        const result = await dbAsync.get('SELECT * FROM users WHERE username = ?', [username]);
        return result as User | undefined;
    },

    // Service operations
    getAllServices: async (): Promise<Service[]> => {
        const results = await dbAsync.all('SELECT * FROM services', []);
        return results as Service[];
    },

    getServiceById: async (id: number): Promise<Service | undefined> => {
        const result = await dbAsync.get('SELECT * FROM services WHERE id = ?', [id]);
        return result as Service | undefined;
    },

    createService: async (service: Omit<Service, 'id'>): Promise<Service> => {
        const { title, description, icon } = service;
        const result = await dbAsync.run(
            'INSERT INTO services (title, description, icon) VALUES (?, ?, ?)',
            [title, description, icon]
        );
        return { id: (result as any).lastID, title, description, icon };
    },

    updateService: async (id: number, service: Partial<Service>): Promise<boolean> => {
        const { title, description, icon } = service;
        const result = await dbAsync.run(
            'UPDATE services SET title = COALESCE(?, title), description = COALESCE(?, description), icon = COALESCE(?, icon) WHERE id = ?',
            [title, description, icon, id]
        );
        return (result as any).changes > 0;
    },

    deleteService: async (id: number): Promise<boolean> => {
        const result = await dbAsync.run('DELETE FROM services WHERE id = ?', [id]);
        return (result as any).changes > 0;
    },

    // Product operations
    getAllProducts: async (): Promise<Product[]> => {
        const results = await dbAsync.all('SELECT * FROM products', []);
        return results as Product[];
    },

    getProductById: async (id: number): Promise<Product | undefined> => {
        const result = await dbAsync.get('SELECT * FROM products WHERE id = ?', [id]);
        return result as Product | undefined;
    },

    createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
        const { name, description, image, features, video_url } = product;
        const result = await dbAsync.run(
            'INSERT INTO products (name, description, image, features, video_url) VALUES (?, ?, ?, ?, ?)',
            [name, description, image, features, video_url]
        );
        return { 
            id: (result as any).lastID, 
            name, 
            description, 
            image, 
            features,
            video_url 
        };
    },

    updateProduct: async (id: number, product: Partial<Product>): Promise<boolean> => {
        const { name, description, image, features, video_url } = product;
        const result = await dbAsync.run(
            'UPDATE products SET name = COALESCE(?, name), description = COALESCE(?, description), image = COALESCE(?, image), features = COALESCE(?, features), video_url = COALESCE(?, video_url) WHERE id = ?',
            [name, description, image, features, video_url, id]
        );
        return (result as any).changes > 0;
    },

    deleteProduct: async (id: number): Promise<boolean> => {
        const result = await dbAsync.run('DELETE FROM products WHERE id = ?', [id]);
        return (result as any).changes > 0;
    },

    // Client operations
    getAllClients: async (): Promise<Client[]> => {
        const results = await dbAsync.all('SELECT * FROM clients', []);
        return results as Client[];
    },

    getClientById: async (id: number): Promise<Client | undefined> => {
        const result = await dbAsync.get('SELECT * FROM clients WHERE id = ?', [id]);
        return result as Client | undefined;
    },

    createClient: async (client: Omit<Client, 'id'>): Promise<Client> => {
        const { name, logo } = client;
        const result = await dbAsync.run(
            'INSERT INTO clients (name, logo) VALUES (?, ?)',
            [name, logo]
        );
        return { id: (result as any).lastID, name, logo };
    },

    updateClient: async (id: number, client: Partial<Client>): Promise<boolean> => {
        const { name, logo } = client;
        const result = await dbAsync.run(
            'UPDATE clients SET name = COALESCE(?, name), logo = COALESCE(?, logo) WHERE id = ?',
            [name, logo, id]
        );
        return (result as any).changes > 0;
    },

    deleteClient: async (id: number): Promise<boolean> => {
        const result = await dbAsync.run('DELETE FROM clients WHERE id = ?', [id]);
        return (result as any).changes > 0;
    }
};
