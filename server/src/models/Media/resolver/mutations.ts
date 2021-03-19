import { IContext } from "@typescript/graphql";
import getBuffer from "@utils/getBuffer";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Field, InputType } from "type-graphql";
import Media, { MediaDocument } from "..";

@InputType({ description: "New Media Data" })
export class NewMediaData {
  @Field()
  public title!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field(() => GraphQLUpload)
  public tokenFile!: FileUpload;

  @Field(() => GraphQLUpload)
  public previewFile!: FileUpload;
}

const newMedia = (newMediaData: NewMediaData, ctx: IContext) => {
  return new Promise<MediaDocument>(async (resolve, reject) => {
    try {
      console.log(ctx.user);
      const tokenFile = await newMediaData.tokenFile;
      const previewFile = await newMediaData.previewFile;
      console.log(newMediaData);

      const { media, files } = await Media.build({
        title: newMediaData.title,
        description: newMediaData.description,
        userId: ctx.user!._id,
        preview: {
          buffer: await getBuffer(previewFile),
          filename: previewFile.filename,
          mimetype: previewFile.mimetype,
        },
        token: {
          buffer: await getBuffer(tokenFile),
          filename: tokenFile.filename,
          mimetype: tokenFile.mimetype,
        },
      });

      await files.previewFile.save();
      await files.tokenFile.save();

      await media.save();

      resolve(media);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  newMedia,
};
