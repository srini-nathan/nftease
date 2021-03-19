import { FileBuildData } from "@typescript/buildData/file";
import { GetDocumentOptions } from "@typescript/class";
import { Types } from "mongoose";
import { ObjectType } from "type-graphql";
import { FileModel } from "..";
import FileSchema from "../schema";
import build from "./build";
import get from "./get";

@ObjectType()
export default class FileClass extends FileSchema {
  // BUILD //

  public static async build(this: FileModel, data: FileBuildData) {
    return build.build(this, data);
  }

  // GET //

  public static async getById(
    this: FileModel,
    id: Types.ObjectId | string,
    options?: GetDocumentOptions
  ) {
    return get.byId(this, id, options);
  }
}
