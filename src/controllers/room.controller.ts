import { NextFunction, Request, Response } from "express";
import { IErrorObj } from "../interfaces/error.interface";
import RoomServices from "../services/room.service";
import GetFilteredRooms from "./search.controller";


class RoomController {
  async AddRoom(req: Request, res: Response, next: NextFunction) {
    const { name, price, roomType } = req.body;

    try {
      // Check to see if the body's contents are not empty
      if (name === "" || price === "") {
        let error: IErrorObj = new Error("name and price must not be empty!");
        error.statusCode = 401;
      }

      const newRoom = await RoomServices.createRoom({
        name,
        price,
        roomType,
      });
      newRoom &&
        res
          .status(200)
          .json({ message: "Room successfully created.", data: newRoom });
    } catch (err) {
      next(err);
    }
  };

  async EditRoom(req: Request, res: Response, next: NextFunction) {
    const { roomId } = req.params;
    const { name, price, roomType } = req.body;
    try {
      if (!roomId || roomId === "") {
        throw new Error("parameter `roomId` is required!");
      }
      if (!(name && price && roomType) || name === "" || price === "") {
        throw new Error("name and price must not be empty!");
      }

      const editedRoom = await RoomServices.editRoom(roomId, {
        name,
        price,
        roomType,
      });
      editedRoom &&
        res
          .status(200)
          .json({ message: "Room successfully edited.", data: editedRoom });
    } catch (err) {
      next(err);
    }
  };

  async DeleteRoom(req: Request, res: Response, next: NextFunction) {
    const { roomId } = req.params;
    try {
      if (!roomId || roomId === "") {
        throw new Error("parameter `roomId` is required!");
      }
      const deleteFeedBack = await RoomServices.deleteRoom(roomId);
      deleteFeedBack &&
        res.status(200).json({ message: "Room successfully deleted." });
    } catch (err) {
      next(err);
    }
  };

  async GetOneRoom(req: Request, res: Response, next: NextFunction) {
    const { roomId } = req.params;
    try {
      if (!roomId || roomId === "") {
        throw new Error("parameter `roomId` is required!");
      }
      const roomInfo = await RoomServices.findRoom(roomId);
      roomInfo && res.status(200).json({ data: roomInfo });
    } catch (err) {
      next(err);
    }
  };

  async GetAllRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const rooms = await GetFilteredRooms(req.query)
      rooms && res.status(200).json({ data: rooms });
    } catch (err) {
      next(err);
    }
  };
}

export default new RoomController();