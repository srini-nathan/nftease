import { UserBuildData } from "@typescript/buildData/user";
import { UserDocument, UserModel } from "..";

const build = (User: UserModel, data: UserBuildData) => {
  return new Promise<UserDocument>(async (resolve, reject) => {
    try {
      const user = new User(data);

      await user.verify();

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export default { build };
