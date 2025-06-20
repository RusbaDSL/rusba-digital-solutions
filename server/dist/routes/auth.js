"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = express_1.default.Router();
// Apply rate limiter to login route
router.post('/login', rateLimiter_1.authRateLimiter, auth_1.login);
exports.default = router;
