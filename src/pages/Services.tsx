import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiService, Service } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import VideoPlayer from '../components/common/VideoPlayer';
import './Services.css';

const Services: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await apiService.getAllServices();
                setServices(data);
            } catch (err) {
                setError('Failed to load services. Please try again later.');
                console.error('Error fetching services:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    const renderMedia = (service: Service) => {
        if (service.video_url?.trim()) {
            return (
                <div className="service-video">
                    <VideoPlayer url={service.video_url} title={service.title} />
                </div>
            );
        }
        
        return (
            <div className="service-icon">
                <i className={service.icon}></i>
            </div>
        );
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="services-container">
            <motion.h1 
                className="services-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Our Services
            </motion.h1>
            <div className="services-grid">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        className="service-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        {renderMedia(service)}
                        <h3>{service.title}</h3>
                        <p className="service-description">
                            {service.description.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;