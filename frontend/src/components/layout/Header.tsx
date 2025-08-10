import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
//import './Header.css';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="header glass-card">
      <motion.div 
        className="logo"
        whileHover={{ scale: 1.05 }}
      >
        <Link to="/">
          <img src="/rusba-logo-crp.png" alt="Rusba Digital Solutions"  />

        </Link>
      </motion.div>

      <Navigation />
    </header>
  );
};

export default Header;