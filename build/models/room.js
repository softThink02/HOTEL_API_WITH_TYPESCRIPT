"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const roomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
    },
    price: {
        type: String,
        require: true,
    },
    roomType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "roomtype",
        required: false,
        // enum: ['Premium', "Standard", "Economic"]
    },
}, { timestamps: true });
roomSchema.index({ "$**": "text" }, { default_language: "english" });
exports.default = (0, mongoose_1.model)(constants_1.SCHEMAS.ROOM_SCHEMA, roomSchema);
