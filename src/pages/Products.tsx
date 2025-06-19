import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiService, Product } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import VideoPlayer from '../components/common/VideoPlayer';
import './Products.css';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await apiService.getAllProducts();
                console.log('Fetched products:', data);
                setProducts(data);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error fetching products:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const renderMedia = (product: Product) => {
        console.log('Rendering media for product:', {
            id: product.id,
            name: product.name,
            videoUrl: product.video_url,
            imageUrl: product.image
        });

        const videoUrl = product.video_url?.trim();
        if (videoUrl) {
            console.log('Attempting to render video:', videoUrl);
            return <VideoPlayer url={videoUrl} title={product.name} />;
        }
        
        const imageUrl = product.image?.trim();
        if (imageUrl) {
            console.log('Falling back to image:', imageUrl);
            return <img src={imageUrl} alt={product.name} />;
        }

        console.warn('No media available for product:', product.name);
        return null;
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="products-container">
            <motion.h1
                className="products-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Our Products
            </motion.h1>
            <div className="products-grid">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="product-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className={`product-media ${product.video_url?.trim() ? 'has-video' : ''}`}>
                            {renderMedia(product)}
                        </div>
                        <div className="product-content">
                            <h3>{product.name}</h3>
                            <p className="product-description">
                                {product.description.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>
                            <div className="product-features">
                                {product.features.split(',').map((feature, i) => (
                                    <span key={i} className="feature-tag">
                                        {feature.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Products;