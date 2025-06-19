import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass-card">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>8 Peace Avenue, Rumuigbo New Layout<br />Port Harcourt, Nigeria</p>
          <p>Email: contact@rusba.com</p>
          <p>Phone: <Link to="tel:+2348128753069">+234 812 875 3069</Link>, <Link to="tel:+2348128753069">+234 812 875 3069</Link> </p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <motion.a href="#" whileHover={{ scale: 1.2 }}>LinkedIn</motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }}>Twitter</motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }}>Facebook</motion.a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Rusba Digital Solutions Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;