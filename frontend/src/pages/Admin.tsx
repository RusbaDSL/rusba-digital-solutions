import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService, Service, Product, Client } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import './Admin.css';

interface FormData {
    // Common fields
    description?: string;
    video_url?: string;
    // Service form fields
    title?: string;
    icon?: string;
    // Product form fields
    name?: string;
    image?: string;
    features?: string;
    // Client form fields
    logo?: string;
}

const Admin: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('services');
    const [services, setServices] = useState<Service[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<FormData>({});

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            switch (activeTab) {
                case 'services':
                    const servicesData = await apiService.getAllServices();
                    setServices(servicesData);
                    break;
                case 'products':
                    const productsData = await apiService.getAllProducts();
                    setProducts(productsData);
                    break;
                case 'clients':
                    const clientsData = await apiService.getAllClients();
                    setClients(clientsData);
                    break;
            }
        } catch (err) {
            setError('Failed to load data. Please try again.');
            console.error('Error fetching data:', err);
        } finally {
            setIsLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        loadData();
    }, [isAuthenticated, navigate, loadData]);

    const resetForm = () => {
        setFormData({});
        setEditingId(null);
        setShowForm(false);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        resetForm();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (activeTab === 'services') {
                if (editingId) {
                    await apiService.updateService(editingId, formData);
                } else {
                    await apiService.createService(formData as Omit<Service, 'id'>);
                }
            } else if (activeTab === 'products') {
                if (editingId) {
                    await apiService.updateProduct(editingId, formData);
                } else {
                    await apiService.createProduct(formData as Omit<Product, 'id'>);
                }
            } else if (activeTab === 'clients') {
                if (editingId) {
                    await apiService.updateClient(editingId, formData);
                } else {
                    await apiService.createClient(formData as Omit<Client, 'id'>);
                }
            }
            
            await loadData();
            resetForm();
        } catch (err) {
            setError('Failed to save. Please try again.');
            console.error('Error saving:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (id: number, data: Service | Product | Client) => {
        setEditingId(id);
        setFormData(data);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this item?')) {
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            switch (activeTab) {
                case 'services':
                    await apiService.deleteService(id);
                    setServices(services.filter(s => s.id !== id));
                    break;
                case 'products':
                    await apiService.deleteProduct(id);
                    setProducts(products.filter(p => p.id !== id));
                    break;
                case 'clients':
                    await apiService.deleteClient(id);
                    setClients(clients.filter(c => c.id !== id));
                    break;
            }
        } catch (err) {
            setError('Failed to delete item. Please try again.');
            console.error('Error deleting item:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={logout} className="logout-button">Logout</button>
            </div>

            <div className="admin-tabs">
                <button
                    className={activeTab === 'services' ? 'active' : ''}
                    onClick={() => handleTabChange('services')}
                >
                    Services
                </button>
                <button
                    className={activeTab === 'products' ? 'active' : ''}
                    onClick={() => handleTabChange('products')}
                >
                    Products
                </button>
                <button
                    className={activeTab === 'clients' ? 'active' : ''}
                    onClick={() => handleTabChange('clients')}
                >
                    Clients
                </button>
            </div>

            <div className="admin-content">
                <div className="content-header">
                    <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                    <button onClick={() => setShowForm(true)} className="add-button">
                        Add New {activeTab.slice(0, -1)}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="admin-form">
                        {activeTab === 'services' && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={formData.title || ''}
                                        onChange={e => setFormData({...formData, title: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        value={formData.description || ''}
                                        onChange={e => setFormData({...formData, description: e.target.value})}
                                        required
                                    />
                                </div>                                <div className="form-group">
                                    <label htmlFor="icon">Icon Class</label>
                                    <input
                                        type="text"
                                        id="icon"
                                        placeholder="e.g., material-icons code computer_services web build"
                                        value={formData.icon || ''}
                                        onChange={e => setFormData({...formData, icon: e.target.value})}
                                        required
                                    />
                                    <small className="form-help-text">
                                        Enter a Material Icons name. Visit <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">Material Icons</a> to browse available icons.
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="video_url">Video URL (Optional)</label>
                                    <input
                                        type="text"
                                        id="video_url"
                                        placeholder="e.g., https://res.cloudinary.com/your-cloud-name/video/upload/your-video"
                                        value={formData.video_url || ''}
                                        onChange={e => setFormData({...formData, video_url: e.target.value})}
                                    />
                                    <small className="form-help-text">
                                        Enter a Cloudinary video URL. The video should be uploaded to your Cloudinary account.
                                    </small>
                                </div>
                            </>
                        )}

                        {activeTab === 'products' && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name || ''}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        value={formData.description || ''}
                                        onChange={e => setFormData({...formData, description: e.target.value})}
                                        required
                                    />
                                </div>                                <div className="form-group">
                                    <label htmlFor="image">Image URL</label>
                                    <input
                                        type="text"
                                        id="image"
                                        placeholder="e.g., https://res.cloudinary.com/your-cloud-name/image/upload/your-image"
                                        value={formData.image || ''}
                                        onChange={e => setFormData({...formData, image: e.target.value})}
                                        
                                    />
                                    <small className="form-help-text">
                                        Enter a Cloudinary image URL. The image should be uploaded to your Cloudinary account.
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="video_url">Video URL (Optional)</label>
                                    <input
                                        type="text"
                                        id="video_url"
                                        placeholder="e.g., https://res.cloudinary.com/your-cloud-name/video/upload/your-video"
                                        value={formData.video_url || ''}
                                        onChange={e => setFormData({...formData, video_url: e.target.value})}
                                    />
                                    <small className="form-help-text">
                                        Enter a Cloudinary video URL. The video should be uploaded to your Cloudinary account.
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="features">Features (comma-separated)</label>
                                    <textarea
                                        id="features"
                                        value={formData.features || ''}
                                        onChange={e => setFormData({...formData, features: e.target.value})}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {activeTab === 'clients' && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name || ''}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="logo">Logo URL</label>
                                    <input
                                        type="text"
                                        id="logo"
                                        value={formData.logo || ''}
                                        onChange={e => setFormData({...formData, logo: e.target.value})}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <div className="form-actions">
                            <button type="submit" className="save-button">
                                {editingId ? 'Update' : 'Create'}
                            </button>
                            <button type="button" onClick={resetForm} className="cancel-button">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                <div className={`${activeTab}-list`}>
                    {activeTab === 'services' && services.map(service => (
                        <div key={service.id} className="admin-item">                            <div className="item-info">
                                <h3>{service.title}</h3>
                                <p className="description-preview">
                                    {service.description.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </p>
                                <div className="icon-preview">
                                    <i className={service.icon}></i>
                                </div>
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleEdit(service.id, service)}>Edit</button>
                                <button onClick={() => handleDelete(service.id)}>Delete</button>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'products' && products.map(product => (
                        <div key={product.id} className="admin-item">
                            <div className="item-info">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <img src={product.image} alt={product.name} className="product-image-preview" />
                                <div className="features-preview">
                                    {product.features.split(',').map((feature, i) => (
                                        <span key={i} className="feature-tag">
                                            {feature.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleEdit(product.id, product)}>Edit</button>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'clients' && clients.map(client => (
                        <div key={client.id} className="admin-item">
                            <div className="item-info">
                                <h3>{client.name}</h3>
                                <img src={client.logo} alt={client.name} className="client-logo-preview" />
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleEdit(client.id, client)}>Edit</button>
                                <button onClick={() => handleDelete(client.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;