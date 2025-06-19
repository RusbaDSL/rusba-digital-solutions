import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API interfaces
export interface LoginResponse {
    token: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
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

// API methods
export const apiService = {
    // Auth
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    // Services
    getAllServices: async (): Promise<Service[]> => {
        const response = await api.get<Service[]>('/services');
        return response.data;
    },

    createService: async (service: Omit<Service, 'id'>): Promise<Service> => {
        const response = await api.post<Service>('/services', service);
        return response.data;
    },

    updateService: async (id: number, service: Partial<Service>): Promise<Service> => {
        const response = await api.put<Service>(`/services/${id}`, service);
        return response.data;
    },

    deleteService: async (id: number): Promise<void> => {
        await api.delete(`/services/${id}`);
    },

    // Products
    getAllProducts: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>('/products');
        return response.data;
    },

    createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
        const response = await api.post<Product>('/products', product);
        return response.data;
    },

    updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
        const response = await api.put<Product>(`/products/${id}`, product);
        return response.data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await api.delete(`/products/${id}`);
    },

    // Clients
    getAllClients: async (): Promise<Client[]> => {
        const response = await api.get<Client[]>('/clients');
        return response.data;
    },

    createClient: async (client: Omit<Client, 'id'>): Promise<Client> => {
        const response = await api.post<Client>('/clients', client);
        return response.data;
    },

    updateClient: async (id: number, client: Partial<Client>): Promise<Client> => {
        const response = await api.put<Client>(`/clients/${id}`, client);
        return response.data;
    },

    deleteClient: async (id: number): Promise<void> => {
        await api.delete(`/clients/${id}`);
    }
};
