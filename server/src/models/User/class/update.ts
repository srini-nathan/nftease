import { Types } from "mongoose";
import { UserDocument } from "..";

const nonce = (user: UserDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      user.nonce = Types.ObjectId().toString();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default { nonce };
