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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbOperations = void 0;
const config_1 = require("./config");
exports.dbOperations = {
    // User operations
    getUserByUsername: (username) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield config_1.dbAsync.get('SELECT * FROM users WHERE username = ?', [username]);
        return result;
    }),
    // Service operations
    getAllServices: () => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield config_1.dbAsync.all('SELECT * FROM services', []);
        return results;
    }),
    getServiceById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield config_1.dbAsync.get('SELECT * FROM services WHERE id = ?', [id]);
        return result;
    }),
    createService: (service) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description, icon } = service;
        const result = yield config_1.dbAsync.run('INSERT INTO services (title, description, icon) VALUES (?, ?, ?)', [title, description, icon]);
        return { id: result.lastID, title, description, icon };
    }),
    updateService: (id, service) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description, icon } = service;
        const result = yield config_1.dbAsync.run('UPDATE services SET title = COALESCE(?, title), description = COALESCE(?, description), icon = COALESCE(?, icon) WHERE id = ?', [title, description, icon, id]);
        return result.changes > 0;
    }),
    deleteService: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield config_1.dbAsync.run('DELETE FROM services WHERE id = ?', [id]);
        return result.changes > 0;
    }),
    // Product operations
    getAllProducts: () => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield config_1.dbAsync.all('SELECT * FROM products', []);
        return results;
    }),
    getProductById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield config_1.dbAsync.get('SELECT * FROM products WHERE id = ?', [id]);
        return result;
    }),
    createProduct: (product) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, description, image, features, video_url } = product;
        const result = yield config_1.dbAsync.run('INSERT INTO products (name, description, image, features, video_url) VALUES (?, ?, ?, ?, ?)', [name, description, image, features, video_url]);
        return {
            id: result.lastID,
            name,
            description,
            image,
            features,
            video_url
        };
    }),
    updateProduct: (id, product) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, description, image, features, video_url } = product;
        const result = yield config_1.dbAsync.run('UPDATE products SET name = COALESCE(?, name), description = COALESCE(?, description), image = COALESCE(?, image), features = COALESCE(?, features), video_url = COALESCE(?, video_url) WHERE id = ?', [name, description, image, features, video_url, id]);
        return result.changes > 0;
    }),
    deleteProduct: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield config_1.dbAsync.run('DELETE FROM products WHERE id = ?', [id]);
        return result.changes > 0;
    }),
    // Client operations
    getAllClients: () => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield config_1.dbAsync.all('SELECT * FROM clients', []);
        return results;
    }),
    getClientById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield config_1.dbAsync.get('SELECT * FROM clients WHERE id = ?', [id]);
        return result;
    }),
    createClient: (client) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, logo } = client;
        const result = yield config_1.dbAsync.run('INSERT INTO clients (name, logo) VALUES (?, ?)', [name, logo]);
        return { id: result.lastID, name, logo };
    }),
    updateClient: (id, client) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, logo } = client;
        const result = yield config_1.dbAsync.run('UPDATE clients SET name = COALESCE(?, name), logo = COALESCE(?, logo) WHERE id = ?', [name, logo, id]);
        return result.changes > 0;
    }),
    deleteClient: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield config_1.dbAsync.run('DELETE FROM clients WHERE id = ?', [id]);
        return result.changes > 0;
    })
};
