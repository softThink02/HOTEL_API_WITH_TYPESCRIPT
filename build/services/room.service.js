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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("../models/room"));
class ROOM_MANAGER {
    // methode for creating room
    createRoom(roomData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRoom = new room_1.default(Object.assign({}, roomData));
                return yield newRoom.save();
            }
            catch (err) {
                // if (err.message.indexOf("duplicate key error") !== -1) {
                //   err.message =
                //     "A room already has this codename, choose another codename";
                //   err.statusCode = 400;
                // }
                throw err;
            }
        });
    }
    // Method for editing room
    editRoom(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield room_1.default.findOneAndUpdate({ _id: id }, newData, { new: true });
            }
            catch (err) {
                if (err.message.indexOf("duplicate key error") !== -1) {
                    err.message =
                        "A room already has this codename, choose another codename";
                    err.statusCode = 400;
                }
                throw err;
            }
        });
    }
    // Method for deleting room
    deleteRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield room_1.default.findOneAndDelete({ _id: id });
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Method for fetching one room
    findRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield room_1.default.findOne({ _id: id }).lean();
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new ROOM_MANAGER();
