"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const products_1 = require("../controllers/products");
const router = express_1.default.Router();
// Public route
router.get('/', products_1.getAllProducts);
// Protected routes
router.post('/', auth_1.authenticateToken, products_1.createProduct);
router.put('/:id', auth_1.authenticateToken, products_1.updateProduct);
router.delete('/:id', auth_1.authenticateToken, products_1.deleteProduct);
exports.default = router;
