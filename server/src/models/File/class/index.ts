import { FileBuildData } from "@typescript/buildData/file";
import { ObjectType } from "type-graphql";
import { FileModel } from "..";
import FileSchema from "../schema";
import build from "./build";

@ObjectType()
export default class FileClass extends FileSchema {
  // BUILD //

  public static async build(this: FileModel, data: FileBuildData) {
    return build.build(this, data);
  }
}
