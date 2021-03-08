import { Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    walletAddress: { type: String, required: true, trim: true },
    bio: { type: String },
  },
  { timestamps: true }
);
