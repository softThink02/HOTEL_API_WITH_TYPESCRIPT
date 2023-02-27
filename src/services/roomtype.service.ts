import Room from "../models/room";
import RoomTypes from "../models/roomType";
import { IRoomType } from "../interfaces/room.interface";

class ROOM_TYPE_MANAGER {
  // get all room types
  async allRoomTypes() {
    try {
      return await RoomTypes.find().lean();
    } catch (err) {
      throw err;
    }
  }

  // create a room type
  async createRoomType(roomTypeData: IRoomType) {
    try {
      const newRoomType = new RoomTypes({
        ...roomTypeData,
      });
      return newRoomType.save();
    } catch (err) {
      throw err;
    }
  }
}

export default new ROOM_TYPE_MANAGER()
