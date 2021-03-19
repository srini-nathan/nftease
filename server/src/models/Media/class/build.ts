import File, { FileDocument } from "@models/File";
import { MediaBuildData } from "@typescript/buildData/media";
import { MediaDocument, MediaModel } from "..";

const build = (Media: MediaModel, data: MediaBuildData) => {
  return new Promise<{
    media: MediaDocument;
    files: { previewFile: FileDocument; tokenFile: FileDocument };
  }>(async (resolve, reject) => {
    try {
      const media = new Media({
        title: data.title,
        description: data.description,
        ownerId: data.userId,
        creatorId: data.userId,
      });

      const previewFile = await File.build(data.preview);
      media.preview.fileId = previewFile._id;

      const tokenFile = await File.build(data.token);
      media.token.fileId = tokenFile._id;

      const files = { previewFile, tokenFile };

      resolve({ media, files });
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};
