import { Document } from "mongoose";

export interface User extends Document {
  readonly username: string;
  readonly address: object;
  readonly bio: string;
}
