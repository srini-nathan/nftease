import { recoverPersonalSignature } from "eth-sig-util";
import jwt from "jsonwebtoken";

import { UserDocument } from "..";

const { bufferToHex } = require("ethereumjs-utils");

const generateJWT = (user: UserDocument, signature: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const msgBufferHex = bufferToHex(
        Buffer.from(user.nonce.toString(), "utf-8")
      );
      const hashAddress = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
      });

      if (hashAddress.toLowerCase() !== user.walletAddress.toLowerCase()) {
        throw new Error("user.generateJWT: Signature verification failed");
      }

      await user.updateNonce();
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};

export default { generateJWT };
