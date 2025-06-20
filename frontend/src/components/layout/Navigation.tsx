import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItems = [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Services' },
        { path: '/products', label: 'Products' },
        ...(isAuthenticated 
            ? [{ path: '/admin', label: 'Admin' }] 
            : []
        ),
    ];

    return (
        <>
            <button 
                className="mobile-menu-btn glass-card"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu glass-card"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                    >
                        {menuItems.map((item) => (
                            <motion.div
                                key={item.path}
                                whileHover={{ x: 10 }}
                            >
                                <Link 
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                        {isAuthenticated ? (
                            <motion.div whileHover={{ x: 10 }}>
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="nav-button"
                                >
                                    Logout
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div whileHover={{ x: 10 }}>
                                <Link 
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="desktop-nav">
                <motion.ul>
                    {menuItems.map((item) => (
                        <motion.li 
                            key={item.path}
                            whileHover={{ y: -2 }}
                        >
                            <Link to={item.path}>{item.label}</Link>
                        </motion.li>
                    ))}
                    {isAuthenticated ? (
                        <motion.li whileHover={{ y: -2 }}>
                            <button 
                                onClick={handleLogout}
                                className="nav-button"
                            >
                                Logout
                            </button>
                        </motion.li>
                    ) : (
                        <motion.li whileHover={{ y: -2 }}>
                            <Link to="/login">Login</Link>
                        </motion.li>
                    )}
                </motion.ul>
            </nav>
        </>
    );
};

export default Navigation;