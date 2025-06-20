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
exports.deleteClient = exports.updateClient = exports.createClient = exports.getAllClients = void 0;
const operations_1 = require("../database/operations");
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield operations_1.dbOperations.getAllClients();
        res.json(clients);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching clients' });
    }
});
exports.getAllClients = getAllClients;
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, logo } = req.body;
        if (!name || !logo) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newClient = yield operations_1.dbOperations.createClient({ name, logo });
        res.status(201).json(newClient);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating client' });
    }
});
exports.createClient = createClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, logo } = req.body;
        const success = yield operations_1.dbOperations.updateClient(id, { name, logo });
        if (!success) {
            return res.status(404).json({ message: 'Client not found' });
        }
        const updatedClient = yield operations_1.dbOperations.getClientById(id);
        res.json(updatedClient);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating client' });
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const success = yield operations_1.dbOperations.deleteClient(id);
        if (!success) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting client' });
    }
});
exports.deleteClient = deleteClient;
