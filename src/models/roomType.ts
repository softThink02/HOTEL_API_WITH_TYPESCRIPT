import { Schema, model } from "mongoose";
import { SCHEMAS } from "../utils/constants";

const roomSchema = new Schema(
  {
    // _id: {type: Schema.Types.ObjectId},
    name: {
      type: String,
      required: true,
      // enum: ["Premium", "Standard", "Economic"],
    },
  },
  { timestamps: true }
);

roomSchema.index({ "$**": "text" }, { default_language: "english" });

export default model(SCHEMAS.Room_Type, roomSchema);
