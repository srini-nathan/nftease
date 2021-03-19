import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import File from "./class";

export default getModelForClass(File, {
  schemaOptions: { collection: "file" },
});

export interface FileDocument extends DocumentType<File> {}

export interface FileModel extends ReturnModelType<typeof File> {}
