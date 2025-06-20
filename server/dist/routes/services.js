"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const services_1 = require("../controllers/services");
const router = express_1.default.Router();
// Public route
router.get('/', services_1.getAllServices);
// Protected routes
router.post('/', auth_1.authenticateToken, services_1.createService);
router.put('/:id', auth_1.authenticateToken, services_1.updateService);
router.delete('/:id', auth_1.authenticateToken, services_1.deleteService);
exports.default = router;
