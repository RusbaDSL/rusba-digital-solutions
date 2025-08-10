import React from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/common/VideoPlayer';
import './Products.css';

interface ProductItem {
    id: number;
    title: string;
    description: string;
    features: string[];
    image?: string;
    video_url?: string;
    icon?: string;
}

const products: ProductItem[] = [
    {
        id: 1,
        title: "Rusba Rides",
        description: "Brand new ride-hailing service with innovative features.",
        features: [
            "Instant ride booking",
            "Transparent fare calculation",
            "Enhanced safety features",
            "Driver and vehicle verification",
            "In-app support and feedback"
        ],
        icon: "fas fa-display",
        image: "https://res.cloudinary.com/duduqz7lm/image/upload/v1754766049/rusbarides_ks8mwq.png"
        
    },
    {
        id: 2,
        title: "eVoting Platform",
        description: "A comprehensive electronic voting system designed for secure, transparent, and accessible elections.",
        features: [
            "End-to-end encryption for vote security",
            "Blockchain-based vote verification",
            "Multi-factor authentication",
            "Real-time result tallying",
            "Accessibility features for all voters"
        ],
        icon: "fas fa-vote-yea",
        video_url: "https://res.cloudinary.com/dfsfskmha/video/upload/v1750454071/rusba/election-in-africa_udfrw3.mp4" // Replace with actual video
    },
    {
        id: 3,
        title: "Smart Home Automation Kit",
        description: "An integrated IoT solution for modern home automation and energy management.",
        features: [
            "Central control hub with WiFi/Bluetooth",
            "Smart lighting and climate control",
            "Energy consumption monitoring",
            "Mobile app integration",
            "Voice control support"
        ],
        icon: "fas fa-home",
        image: "/images/dev-boards.jfif"
    },
    {
        id: 4,
        title: "Industrial IoT Sensors",
        description: "High-precision sensors for industrial monitoring and automation applications.",
        features: [
            "Real-time data collection",
            "Long-range wireless connectivity",
            "Extended battery life",
            "Industrial-grade durability",
            "Cloud dashboard integration"
        ],
        icon: "fas fa-industry",
        image: "/images/team-working.jpg"
    },
    
];

const Products: React.FC = () => {
    const renderMedia = (product: ProductItem) => {
        if (product.video_url?.trim()) {
            return (
                <div className="product-video">
                    <VideoPlayer url={product.video_url} title={product.title} />
                </div>
            );
        }
        
        if (product.image) {
            return (
                <div className="product-image">
                    <img src={product.image} alt={product.title} />
                </div>
            );
        }
        
        return (
            <div className="product-icon">
                <i className={product.icon}></i>
            </div>
        );
    };    return (
        <div className="products-container">
            <motion.h1 
                className="products-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Our Products
            </motion.h1>
            
            <motion.div 
                className="products-intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <p>
                    Discover our innovative range of digital products designed to transform and 
                    elevate your business operations. From secure voting systems to smart automation 
                    solutions, each product is crafted with cutting-edge technology and 
                    backed by our commitment to excellence.
                </p>
                <p>
                    Our products combine robust security, user-friendly interfaces, and 
                    scalable architecture to meet the evolving needs of modern businesses 
                    and organizations. Experience the power of digital innovation with our 
                    carefully engineered solutions.
                </p>
            </motion.div>

            <div className="products-grid">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="product-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        {renderMedia(product)}
                        <div className="product-content">
                            <h3>{product.title}</h3>
                            <p className="product-description">{product.description}</p>
                            <ul className="product-features">
                                {product.features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                                    >
                                        <i className="fas fa-check"></i>
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Products;