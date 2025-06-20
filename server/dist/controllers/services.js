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
exports.deleteService = exports.updateService = exports.createService = exports.getAllServices = void 0;
const operations_1 = require("../database/operations");
const getAllServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield operations_1.dbOperations.getAllServices();
        res.json(services);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching services' });
    }
});
exports.getAllServices = getAllServices;
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, icon } = req.body;
        if (!title || !description || !icon) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newService = yield operations_1.dbOperations.createService({ title, description, icon });
        res.status(201).json(newService);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating service' });
    }
});
exports.createService = createService;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { title, description, icon } = req.body;
        const success = yield operations_1.dbOperations.updateService(id, { title, description, icon });
        if (!success) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const updatedService = yield operations_1.dbOperations.getServiceById(id);
        res.json(updatedService);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating service' });
    }
});
exports.updateService = updateService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const success = yield operations_1.dbOperations.deleteService(id);
        if (!success) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting service' });
    }
});
exports.deleteService = deleteService;
