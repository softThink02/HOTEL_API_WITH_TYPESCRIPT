"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const roomSchema = new mongoose_1.Schema({
    // _id: {type: Schema.Types.ObjectId},
    name: {
        type: String,
        required: true,
        // enum: ["Premium", "Standard", "Economic"],
    },
}, { timestamps: true });
roomSchema.index({ "$**": "text" }, { default_language: "english" });
exports.default = (0, mongoose_1.model)(constants_1.SCHEMAS.Room_Type, roomSchema);
