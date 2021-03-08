import { INestApplication } from "@nestjs/common";

import { UsersService } from "../../../src/users/users.service";
import { User } from "../../../src/users/users.interface";

export interface SeededUsers {
  user_1: User;
}

const createUsers = (app: INestApplication) => {
  return new Promise<SeededUsers>(async (resolve, reject) => {
    try {
      const userService = app.get(UsersService);

      const user_1 = (
        await userService.createUser({
          username: "user1",
          bio: "Hi! I am the first user",
          walletAddress: "<wallet-address>",
        })
      ).data;

      const users = {
        user_1,
      };

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

export default createUsers;
