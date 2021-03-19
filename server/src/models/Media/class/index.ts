import { MediaBuildData } from "@typescript/buildData/media";
import { ObjectType } from "type-graphql";
import { MediaModel } from "..";
import MediaSchema from "../schema";
import build from "./build";

@ObjectType()
export default class MediaClass extends MediaSchema {
  // BUILD //

  public static async build(this: MediaModel, data: MediaBuildData) {
    return build.build(this, data);
  }
}
