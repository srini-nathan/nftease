import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import User from "./class";

export default getModelForClass(User, {
  schemaOptions: { collection: "users" },
});

export interface UserDocument extends DocumentType<User> {}

export interface UserModel extends ReturnModelType<typeof User> {}
