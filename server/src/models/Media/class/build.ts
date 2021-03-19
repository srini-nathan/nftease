import File, { FileDocument } from "@models/File";
import { MediaBuildData } from "@typescript/buildData/media";
import ipfs from "@utils/ipfs";
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

      // Token File
      const tokenFile = await File.build(data.token);
      media.token.fileId = tokenFile._id;

      const ipfsInstance = await ipfs();
      const res = await ipfsInstance.add({
        path: `/tokens/${data.token.filename}`,
        content: data.token.buffer,
      });
      console.log("res", res);

      // Preview File
      const previewFile = await File.build(data.preview);
      media.preview.fileId = previewFile._id;

      const files = { previewFile, tokenFile };

      resolve({ media, files });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export default {
  build,
};
