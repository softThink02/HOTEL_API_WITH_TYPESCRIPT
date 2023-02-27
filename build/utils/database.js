"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("./constants");
const connectDB = (cb) => {
    console.log('connecting to DB...');
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connect(constants_1.DATABASE.MONGO_URI)
        .then(connection => {
        console.log('connected to DB!');
        cb();
    }).catch(err => {
        console.log(err);
    });
};
exports.default = connectDB;
