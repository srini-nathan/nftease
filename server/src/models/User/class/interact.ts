// import { recoverPersonalSignature } from "eth-sig-util";
// import { bufferToHex } from "ethereumjs-utils";

import { UserDocument } from "..";

const generateJWT = (user: UserDocument, signature: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const msg = `typ gay ${user.nonce}`;

      // const msgBufferHex = bufferToHex(Buffer.from(msg, "utf-8"));
      // const hashAddress = recoverPersonalSignature({
      //   data: msgBufferHex,
      //   sig: signature,
      // });

      resolve("");
    } catch (e) {
      reject(e);
    }
  });
};

export default { generateJWT };
