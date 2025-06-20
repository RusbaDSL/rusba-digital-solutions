"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const clients_1 = require("../controllers/clients");
const router = express_1.default.Router();
// Public route
router.get('/', clients_1.getAllClients);
// Protected routes
router.post('/', auth_1.authenticateToken, clients_1.createClient);
router.put('/:id', auth_1.authenticateToken, clients_1.updateClient);
router.delete('/:id', auth_1.authenticateToken, clients_1.deleteClient);
exports.default = router;
