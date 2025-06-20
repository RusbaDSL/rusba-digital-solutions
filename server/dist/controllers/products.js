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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getAllProducts = void 0;
const operations_1 = require("../database/operations");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield operations_1.dbOperations.getAllProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});
exports.getAllProducts = getAllProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, image, features, video_url } = req.body;
        if (!name || !description || !image || !features) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newProduct = yield operations_1.dbOperations.createProduct({
            name,
            description,
            image,
            features,
            video_url
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, description, image, features, video_url } = req.body;
        const success = yield operations_1.dbOperations.updateProduct(id, {
            name,
            description,
            image,
            features,
            video_url
        });
        if (!success) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const updatedProduct = yield operations_1.dbOperations.getProductById(id);
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const success = yield operations_1.dbOperations.deleteProduct(id);
        if (!success) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});
exports.deleteProduct = deleteProduct;
