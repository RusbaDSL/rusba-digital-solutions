"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../database/config");
const schema_1 = require("../database/schema");
const initializeAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialize database schema
        yield (0, schema_1.initializeSchema)();
        console.log('Database schema initialized');
        // Check if admin already exists
        const existingAdmin = yield config_1.dbAsync.get('SELECT * FROM users WHERE username = ?', ['admin']);
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }
        // Hash the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash('RusbaAdmin2025!', salt);
        // Create admin user
        yield config_1.dbAsync.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['admin', hashedPassword, 'admin']);
        console.log('Admin user created successfully');
    }
    catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
});
// Run the initialization
initializeAdmin();
