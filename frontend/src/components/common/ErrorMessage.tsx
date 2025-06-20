import { motion } from 'framer-motion';
import './ErrorMessage.css';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <motion.div 
            className="error-message glass-card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <p>❌ {message}</p>
        </motion.div>
    );
};

export default ErrorMessage;
