import express from "express";
const router = express.Router();

import isAuthenticated from "../middleware/authenticator";
import isAuthorized from "../middleware/authorizer";
import RoomControllers from "../controllers/room.controller";
import RoomTypeControllers from "../controllers/roomtype.controller";

// route for getting all room types from the database
router.get('/room-types', RoomTypeControllers.getRoomTypes)

// route for creating room types
router.post('/room-types', isAuthenticated, isAuthorized, RoomTypeControllers.postRoomTypes)

// route for adding a room to the database
router.post('/rooms', isAuthenticated, isAuthorized, RoomControllers.AddRoom)

// route for fetching all rooms from the database
router.get('/rooms', RoomControllers.GetAllRooms)

// route for editing a room in the database
router.patch('/rooms/:roomId', isAuthenticated, isAuthorized, RoomControllers.EditRoom)

// route for deleting a room from the database
router.delete('/rooms/:roomId', isAuthenticated, isAuthorized, RoomControllers.DeleteRoom)

// route for fetching a sinhgle room from the database
router.get('/rooms/:roomId', RoomControllers.GetOneRoom)

export default router;