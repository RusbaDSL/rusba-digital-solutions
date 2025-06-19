import bcrypt from 'bcryptjs';
import { dbAsync } from '../database/config';
import { initializeSchema } from '../database/schema';

const initializeAdmin = async () => {
    try {
        // Initialize database schema
        await initializeSchema();
        console.log('Database schema initialized');

        // Check if admin already exists
        const existingAdmin = await dbAsync.get('SELECT * FROM users WHERE username = ?', ['admin']);
        
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('RusbaAdmin2025!', salt);

        // Create admin user
        await dbAsync.run(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            ['admin', hashedPassword, 'admin']
        );

        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

// Run the initialization
initializeAdmin();
