import React from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/common/VideoPlayer';
import './Services.css';

interface ServiceItem {
    id: number;
    title: string;
    description: string;
    image?: string;
    video_url?: string;
    icon?: string;
}

const services: ServiceItem[] = [
    {
        id: 1,
        title: "Software Development",
        description: "End-to-end software development services tailored to your needs.\nSpecializing in web applications, mobile apps, and enterprise solutions.\nAgile development methodology with continuous integration and deployment.",
        icon: "fas fa-code",
        image: "/images/team-working.jpg"
    },
    {
        id: 2,
        title: "IoT Solutions",
        description: "Custom Internet of Things (IoT) solutions for business automation.\nSensor network design and implementation.\nReal-time monitoring and data analytics.\nCloud integration and edge computing solutions.",
        icon: "fas fa-microchip",
        image: "/images/dev-boards.jfif"
    },
    {
        id: 3,
        title: "Digital Transformation",
        description: "Comprehensive digital transformation services.\nLegacy system modernization and cloud migration.\nBusiness process automation and workflow optimization.\nDigital strategy consulting and implementation.",
        icon: "fas fa-digital-tachograph",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Replace with actual video
    },
    {
        id: 4,
        title: "Consulting & Training",
        description: "Expert technical consulting services.\nTechnology stack assessment and recommendations.\nCustom training programs for development teams.\nBest practices and architecture review.",
        icon: "fas fa-users-gear"
    },
    {
        id: 5,
        title: "Cloud Solutions",
        description: "Cloud infrastructure design and implementation.\nMigration services for AWS, Azure, and Google Cloud.\nServerless architecture and microservices.\nCloud cost optimization and management.",
        icon: "fas fa-cloud",
    },
    {
        id: 6,
        title: "Security Services",
        description: "Comprehensive cybersecurity solutions.\nSecurity audits and vulnerability assessment.\nImplementation of security best practices.\nSecure development lifecycle integration.",
        icon: "fas fa-shield-halved",
    }
];

const Services: React.FC = () => {
    const renderMedia = (service: ServiceItem) => {
        if (service.video_url?.trim()) {
            return (
                <div className="service-video">
                    <VideoPlayer url={service.video_url} title={service.title} />
                </div>
            );
        }
        
        if (service.image) {
            return (
                <div className="service-image">
                    <img src={service.image} alt={service.title} />
                </div>
            );
        }
        
        return (
            <div className="service-icon">
                <i className={service.icon}></i>
            </div>
        );
    };    return (
        <div className="services-container">
            <motion.h1 
                className="services-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Our Services
            </motion.h1>
            
            <motion.div 
                className="services-intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <p>
                    At Rusba Digital Solutions, we combine cutting-edge technology with industry expertise 
                    to deliver innovative solutions that drive your business forward. Our comprehensive suite 
                    of services spans from custom software development to advanced IoT implementations, 
                    ensuring that your digital transformation journey is seamless and successful.
                </p>
                <p>
                    Whether you're looking to modernize your existing systems, implement new technologies, 
                    or need expert guidance on your digital strategy, our team of skilled professionals is 
                    here to help you achieve your goals with precision and excellence.
                </p>
            </motion.div>

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