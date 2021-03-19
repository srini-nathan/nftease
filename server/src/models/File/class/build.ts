import { FileBuildData } from "@typescript/buildData/file";
import { FileDocument, FileModel } from "..";

const build = (File: FileModel, data: FileBuildData) => {
  return new Promise<FileDocument>(async (resolve, reject) => {
    try {
      const file = new File({
        buffer: data.buffer,
        filename: data.filename,
        mimetype: data.mimetype,
      });

      resolve(file);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};
