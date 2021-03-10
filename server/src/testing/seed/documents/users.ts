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
        walletAddress: "0x89eDc6677Ba87a976BAB5fe9Ad46ac984a6DB749",
      });

      const user_2_webadmin = new User({
        username: "user2webadmin",
        bio: "I'm a webadmin, fear me",
        walletAddress: "0xbCda41FD79DAD8687171ee4BD0856B759B0bAcdb",
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
