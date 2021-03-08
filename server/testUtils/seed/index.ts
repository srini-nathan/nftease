import { INestApplication } from "@nestjs/common";

import createUsers, { SeededUsers } from "./documents/users";
import { UsersRepository } from "../../src/users/users.repository";

export interface SeededDatabase {
  users: SeededUsers;
}

export const seedDatabase = (app: INestApplication) => {
  return new Promise<SeededDatabase>(async (resolve, reject) => {
    try {
      await clearDatabase(app);

      const users = await createUsers(app);

      console.log("Database seeded");

      resolve({
        users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const clearDatabase = (app: INestApplication) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const userRepository = app.get(UsersRepository);

      await userRepository.deleteAll();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
