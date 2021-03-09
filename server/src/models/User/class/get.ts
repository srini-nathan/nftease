import { GetDocumentOptions } from "@typescript/class";
import populateOptions from "@utils/populateOptions";
import { Types } from "mongoose";
import { UserDocument, UserModel } from "..";

const byIdDefaultOptions: GetDocumentOptions = {
  throwError: false,
};
const byId = (
  User: UserModel,
  id: Types.ObjectId | string,
  options: GetDocumentOptions = byIdDefaultOptions
): Promise<UserDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const user = await User.findById(id);

      if (!user && options.throwError) {
        throw new Error("User.getById: Unable to find user");
      }

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const byUsernameDefaultOptions: GetDocumentOptions = {
  throwError: false,
};
const byUsername = (
  User: UserModel,
  username: string,
  options: GetDocumentOptions = byUsernameDefaultOptions
): Promise<UserDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byUsernameDefaultOptions);

      const user = await User.findOne({ username });

      if (!user && options.throwError) {
        throw new Error("User.getByUsername: Unable to find user");
      }

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const byWalletAddressDefaultOptions: GetDocumentOptions = {
  throwError: false,
};
const byWalletAddress = (
  User: UserModel,
  walletAddress: string,
  options: GetDocumentOptions = byWalletAddressDefaultOptions
): Promise<UserDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byWalletAddressDefaultOptions);

      const user = await User.findOne({ walletAddress });

      if (!user && options.throwError) {
        throw new Error("User.getByWalletAddress: Unable to find user");
      }

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  byUsername,
  byWalletAddress,
};
