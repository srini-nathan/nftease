import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import Media from "./class";

export default getModelForClass(Media, {
  schemaOptions: { collection: "media" },
});

export interface MediaDocument extends DocumentType<Media> {}

export interface MediaModel extends ReturnModelType<typeof Media> {}
