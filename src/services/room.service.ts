import Room from "../models/room";
import RoomTypes from "../models/roomType";
import { IRoom } from "../interfaces/room.interface";

class ROOM_MANAGER {

  // methode for creating room
  async createRoom(roomData: IRoom) {
    try {
      const newRoom = new Room({
        ...roomData,
      });
      return await newRoom.save();
    } catch (err) {
      // if (err.message.indexOf("duplicate key error") !== -1) {
      //   err.message =
      //     "A room already has this codename, choose another codename";
      //   err.statusCode = 400;
      // }
      throw err;
    }
  }

  // Method for editing room
  async editRoom(id: string, newData: Partial<IRoom>) {
    try {
      return await Room.findOneAndUpdate({ _id: id }, newData, { new: true });
    } catch (err: any) {
      if (err.message.indexOf("duplicate key error") !== -1) {
        err.message =
          "A room already has this codename, choose another codename";
        err.statusCode = 400;
      }
      throw err;
    }
  }

  // Method for deleting room
  async deleteRoom(id: string) {
    try {
      return await Room.findOneAndDelete({ _id: id });
    } catch (err) {
      throw err;
    }
  }

  // Method for fetching one room
  async findRoom(id: string) {
    try {
      return await Room.findOne({ _id: id }).lean();
    } catch (err) {
      throw err;
    }
  }
}

export default new ROOM_MANAGER();
