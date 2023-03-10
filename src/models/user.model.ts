import { Schema, model } from "mongoose";
import { SCHEMAS } from "../utils/constants";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      required: false,
      default: "guest",
      enum: ["guest", "admin"],
    },
  },
  { timestamps: true }
);

userSchema.index({ "$**": "text" }, { default_language: "english" });

export default model(SCHEMAS.USER_SCHEMA, userSchema);
