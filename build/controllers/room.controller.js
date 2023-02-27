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
const room_service_1 = __importDefault(require("../services/room.service"));
const search_controller_1 = __importDefault(require("./search.controller"));
class RoomController {
    AddRoom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, roomType } = req.body;
            try {
                // Check to see if the body's contents are not empty
                if (name === "" || price === "") {
                    let error = new Error("name and price must not be empty!");
                    error.statusCode = 401;
                }
                const newRoom = yield room_service_1.default.createRoom({
                    name,
                    price,
                    roomType,
                });
                newRoom &&
                    res
                        .status(200)
                        .json({ message: "Room successfully created.", data: newRoom });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    EditRoom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roomId } = req.params;
            const { name, price, roomType } = req.body;
            try {
                if (!roomId || roomId === "") {
                    throw new Error("parameter `roomId` is required!");
                }
                if (!(name && price && roomType) || name === "" || price === "") {
                    throw new Error("name and price must not be empty!");
                }
                const editedRoom = yield room_service_1.default.editRoom(roomId, {
                    name,
                    price,
                    roomType,
                });
                editedRoom &&
                    res
                        .status(200)
                        .json({ message: "Room successfully edited.", data: editedRoom });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    DeleteRoom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roomId } = req.params;
            try {
                if (!roomId || roomId === "") {
                    throw new Error("parameter `roomId` is required!");
                }
                const deleteFeedBack = yield room_service_1.default.deleteRoom(roomId);
                deleteFeedBack &&
                    res.status(200).json({ message: "Room successfully deleted." });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    GetOneRoom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roomId } = req.params;
            try {
                if (!roomId || roomId === "") {
                    throw new Error("parameter `roomId` is required!");
                }
                const roomInfo = yield room_service_1.default.findRoom(roomId);
                roomInfo && res.status(200).json({ data: roomInfo });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    GetAllRooms(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield (0, search_controller_1.default)(req.query);
                rooms && res.status(200).json({ data: rooms });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
}
exports.default = new RoomController();
