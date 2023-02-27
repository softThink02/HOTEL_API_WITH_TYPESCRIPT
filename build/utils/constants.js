"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMAS = exports.DATABASE = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DATABASE = {
    MONGO_URI: process.env.MONGO_URI
};
exports.DATABASE = DATABASE;
const SCHEMAS = {
    ROOM_SCHEMA: 'room',
    Room_Type: "roomtype",
    USER_SCHEMA: "user",
};
exports.SCHEMAS = SCHEMAS;
