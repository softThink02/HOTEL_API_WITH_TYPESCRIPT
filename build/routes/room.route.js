"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authenticator_1 = __importDefault(require("../middleware/authenticator"));
const authorizer_1 = __importDefault(require("../middleware/authorizer"));
const room_controller_1 = __importDefault(require("../controllers/room.controller"));
const roomtype_controller_1 = __importDefault(require("../controllers/roomtype.controller"));
// route for getting all room types from the database
router.get('/room-types', roomtype_controller_1.default.getRoomTypes);
// route for creating room types
router.post('/room-types', authenticator_1.default, authorizer_1.default, roomtype_controller_1.default.postRoomTypes);
// route for adding a room to the database
router.post('/rooms', authenticator_1.default, authorizer_1.default, room_controller_1.default.AddRoom);
// route for fetching all rooms from the database
router.get('/rooms', room_controller_1.default.GetAllRooms);
// route for editing a room in the database
router.patch('/rooms/:roomId', authenticator_1.default, authorizer_1.default, room_controller_1.default.EditRoom);
// route for deleting a room from the database
router.delete('/rooms/:roomId', authenticator_1.default, authorizer_1.default, room_controller_1.default.DeleteRoom);
// route for fetching a sinhgle room from the database
router.get('/rooms/:roomId', room_controller_1.default.GetOneRoom);
exports.default = router;
