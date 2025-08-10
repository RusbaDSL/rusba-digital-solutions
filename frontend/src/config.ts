// config.ts
const env = process.env.NODE_ENV || 'development';

interface Config {
    apiUrl: string;
}

const config: { [key: string]: Config } = {
    development: {
        apiUrl: 'http://localhost:5100/api'
    },
    production: {
        apiUrl: 'https://rusba-digital-solutions-api.onrender.com/api'
    }
};

export default config[env];
