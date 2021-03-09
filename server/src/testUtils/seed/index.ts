import User from "@models/User";
import createUsers, { SeededUsers } from "./documents/users";

export interface SeededDatabase {
  users: SeededUsers;
}

export const seedDatabase = () => {
  return new Promise<SeededDatabase>(async (resolve, reject) => {
    try {
      await clearDatabase();

      const users = await createUsers();

      console.log("Database seeded");

      resolve({
        users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const clearDatabase = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await User.deleteMany({});

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
