import { Express } from "express";
import request from "supertest";
import sigUtil from "eth-sig-util";

export const jestLogin = (
  app: Express,
  walletAddress: string,
  nonce: string,
  privateKey: string
) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const loginMutation = `
        mutation Login($data: LoginData!) {
          login(data: $data)
        }
      `;

      const privateHex = Buffer.from(privateKey, "hex");
      const signature = sigUtil.personalSign(privateHex, {
        data: nonce,
      });

      const res = await request(app)
        .post("/graphql")
        .send({
          query: loginMutation,
          variables: {
            data: {
              walletAddress,
              signature,
            },
          },
        });

      resolve(res.body.data.login);
    } catch (e) {
      reject(e);
    }
  });
};
