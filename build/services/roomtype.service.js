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
const roomType_1 = __importDefault(require("../models/roomType"));
class ROOM_TYPE_MANAGER {
    // get all room types
    allRoomTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield roomType_1.default.find().lean();
            }
            catch (err) {
                throw err;
            }
        });
    }
    // create a room type
    createRoomType(roomTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRoomType = new roomType_1.default(Object.assign({}, roomTypeData));
                return newRoomType.save();
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new ROOM_TYPE_MANAGER();
