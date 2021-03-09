import User, { UserDocument } from "@models/User";

export interface SeededUsers {
  user_1: UserDocument;
  user_2_webadmin: UserDocument;
}

const createUsers = () => {
  return new Promise<SeededUsers>(async (resolve, reject) => {
    try {
      const user_1 = new User({
        username: "user1",
        bio: "Hi! I am the first user",
        walletAddress: "<wallet-address>",
      });

      const user_2_webadmin = new User({
        username: "user2webadmin",
        bio: "I'm a webadmin, fear me",
        walletAddress: "<wallet-address-2>",
        roles: ["WEBADMIN"],
      });

      const users = {
        user_1,
        user_2_webadmin,
      };

      for (let i = 0; i < Object.values(users).length; i++) {
        await Object.values(users)[i].save();
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

export default createUsers;
