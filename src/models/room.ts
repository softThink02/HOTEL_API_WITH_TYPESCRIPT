import { Schema, model } from "mongoose";
import { SCHEMAS } from "../utils/constants";

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    price: {
      type: String,
      require: true,
    },
    roomType: {
      type: Schema.Types.ObjectId,
      ref: "roomtype",
      required: false,
      // enum: ['Premium', "Standard", "Economic"]
    },
  },
  { timestamps: true }
);

roomSchema.index({ "$**": "text" }, { default_language: "english" });

export default model(SCHEMAS.ROOM_SCHEMA, roomSchema);
