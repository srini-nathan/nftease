import File from "@models/File";
import FileClass from "@models/File/class";
import { IContext } from "@typescript/graphql";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import { MediaDocument } from "..";
import MediaClass from "../class";
import mutations, { NewMediaData } from "./mutations";

@Resolver(() => MediaClass)
export default class MediaResolver {
  /**
   * Field Resolvers
   */

  @FieldResolver(() => FileClass)
  async token(@Root() media: MediaDocument) {
    return File.getById(media.token.fileId!.toString());
  }

  @FieldResolver(() => FileClass)
  async preview(@Root() media: MediaDocument) {
    return File.getById(media.preview.fileId!.toString());
  }

  /**
   * Mutations
   */

  @Authorized()
  @Mutation(() => MediaClass)
  async newMedia(
    @Arg("data") newMediaData: NewMediaData,
    @Ctx() ctx: IContext
  ): Promise<MediaDocument> {
    return mutations.newMedia(newMediaData, ctx);
  }
}
