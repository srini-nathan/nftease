import { GetDocumentOptions } from "@typescript/class";
import populateOptions from "@utils/populateOptions";
import { Types } from "mongoose";
import { FileDocument, FileModel } from "..";

const byIdDefaultOptions: GetDocumentOptions = {
  throwError: false,
};
const byId = (
  File: FileModel,
  id: Types.ObjectId | string,
  options: GetDocumentOptions = byIdDefaultOptions
): Promise<FileDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const file = await File.findById(id);

      if (!file && options.throwError) {
        throw new Error("File.getById: Unable to find file");
      }

      resolve(file);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
};
