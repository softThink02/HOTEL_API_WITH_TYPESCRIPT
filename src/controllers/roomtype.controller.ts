import { NextFunction, Request, Response } from "express";

import RoomTypeService from "../services/roomtype.service";

class RoomTypeController {

  async getRoomTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const allRoomTypes = await RoomTypeService.allRoomTypes();
      res.status(200).json({
        data: allRoomTypes,
      });
    } catch (err) {
      next(err);
    }
  };

  async postRoomTypes(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    try {
      const newRoomtype = await RoomTypeService.createRoomType({ name });
      res.status(200).json({
        message: "Room type created successfully.",
        data: newRoomtype,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default new RoomTypeController()