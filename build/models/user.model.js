"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        required: false,
        default: "guest",
        enum: ["guest", "admin"],
    },
}, { timestamps: true });
userSchema.index({ "$**": "text" }, { default_language: "english" });
exports.default = (0, mongoose_1.model)(constants_1.SCHEMAS.USER_SCHEMA, userSchema);
