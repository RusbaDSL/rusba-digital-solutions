import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { apiService, Client } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import './Home.css';

const Home = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await apiService.getAllClients();
                setClients(data);
            } catch (err: any) {
                setError(err?.message || 'An error occurred fetching clients');
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container">
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hero glass-card"
            >
                <h1>Welcome to Rusba Digital Solutions Limited</h1>
                <p className="hero-subtitle">Innovative Technology Solutions for Tomorrow's Challenges</p>
                <motion.div 
                    className="hero-cta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/services" className="cta-button primary">Explore Our Services</Link>
                    <Link to="/products" className="cta-button secondary">View Products</Link>
                </motion.div>
            </motion.section>

            <motion.section 
                className="features glass-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="features-grid">
                    <div className="feature-card">
                        <i className="material-icons">code</i>
                        <h3>Custom Software Development</h3>
                        <p>Tailored solutions built with cutting-edge technology to meet your specific business needs.</p>
                    </div>
                    <div className="feature-card">
                        <i className="material-icons">phone_android</i>
                        <h3>Mobile App Development</h3>
                        <p>Native and cross-platform mobile applications that deliver exceptional user experiences.</p>
                    </div>
                    <div className="feature-card">
                        <i className="material-icons">cloud</i>
                        <h3>Cloud Solutions</h3>
                        <p>Scalable cloud infrastructure and services to power your digital transformation.</p>
                    </div>
                    <div className="feature-card">
                        <i className="material-icons">security</i>
                        <h3>Cybersecurity</h3>
                        <p>Comprehensive security solutions to protect your digital assets and data.</p>
                    </div>
                </div>
            </motion.section>

            <motion.section 
                className="stats glass-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>50+</h3>
                        <p>Projects Completed</p>
                    </div>
                    <div className="stat-card">
                        <h3>30+</h3>
                        <p>Happy Clients</p>
                    </div>
                    <div className="stat-card">
                        <h3>5+</h3>
                        <p>Years Experience</p>
                    </div>
                    <div className="stat-card">
                        <h3>24/7</h3>
                        <p>Technical Support</p>
                    </div>
                </div>
            </motion.section>

            <motion.section 
                className="about glass-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="about-grid">
                    <div className="about-content">
                        <h2>Leading Tech Innovation in Port Harcourt</h2>
                        <p>Rusba Digital Solutions is at the forefront of digital transformation in Nigeria. We combine technical expertise with industry knowledge to deliver innovative solutions that drive business growth.</p>
                        <ul className="about-features">
                            <li><i className="material-icons">check_circle</i> Expert Team of Developers</li>
                            <li><i className="material-icons">check_circle</i> Agile Development Process</li>
                            <li><i className="material-icons">check_circle</i> 24/7 Technical Support</li>
                            <li><i className="material-icons">check_circle</i> Cutting-edge Technologies</li>
                        </ul>
                    </div>
                    <div className="about-image">
                        <img src="/images/team-working.jpg" alt="Rusba Team at Work" />
                    </div>
                </div>
            </motion.section>

            <motion.section 
                className="clients glass-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h2>Our Trusted Partners</h2>
                <p className="section-subtitle">Join our growing list of satisfied clients</p>
                <div className="client-logos">
                    {clients.length > 0 ? (
                        clients.map((client) => (
                            <motion.div 
                                key={client.id}
                                className="client-logo-container"
                                whileHover={{ scale: 1.1 }}
                            >
                                <img src={client.logo} alt={client.name} />
                                <p className="client-name">{client.name}</p>
                            </motion.div>
                        ))
                    ) : (
                        <p className="no-data">No clients to display</p>
                    )}
                </div>
            </motion.section>

            <motion.section 
                className="cta-section glass-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <h2>Ready to Transform Your Business?</h2>
                <p>Let's discuss how we can help you achieve your digital goals.</p>
                <div className="cta-buttons">
                    <Link to="/services" className="cta-button primary">View Our Services</Link>
                    <a href="mailto:contact@rusba.com" className="cta-button secondary">Contact Us</a>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;