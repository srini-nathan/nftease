import request from "supertest";
import MongoMemoryServer from "mongodb-memory-server-core";

import MongoTestModule from "@testing/MongoTestModule";
import { seedDatabase, SeededDatabase } from "@testing/seed";
import createApp from "../../../app";
import User from "..";

let documents: SeededDatabase, mongoServer: MongoMemoryServer, app: any;
const setupDatabase = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      documents = await seedDatabase();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

beforeAll(async (done) => {
  mongoServer = await MongoTestModule.prepareDatabase();

  app = await createApp();

  await setupDatabase();

  done();
});

afterAll(async (done) => {
  await MongoTestModule.disconnectAndStopServer(mongoServer);

  done();
});

describe("User Resolver", () => {
  describe("Queries", () => {
    describe("user", () => {
      const userQuery = `
        query User($id: ID, $username: String, $walletAddress: String) {
          user(id: $id, username: $username, walletAddress: $walletAddress) {
            _id
            username
            walletAddress
            bio
            roles
          }
        }
      `;

      test("should get user by id", async () => {
        const res = await request(app)
          .post("/graphql")
          .send({
            query: userQuery,
            variables: { id: documents.users.user_1._id },
          });

        expect(res.status).toBe(200);

        expect(res.body.data.user.username).toBe(
          documents.users.user_1.username
        );
      });
    });
  });

  describe("Mutations", () => {
    describe("newUser", () => {
      const newUserMutation = `
        mutation NewUser($data: NewUserData!) {
          newUser(data: $data) {
            username
            walletAddress
            bio
          }
        }
      `;

      describe("success", () => {
        test("should successfully create a new user", async () => {
          const data = {
            username: "newestuser",
            walletAddress: "<ADDRESS-12344>",
            bio: "a bio for this user",
          };
          const res = await request(app).post("/graphql").send({
            query: newUserMutation,
            variables: { data },
          });

          expect(res.status).toBe(200);
          expect(res.body.data.newUser).toEqual(data);

          const user = await User.getByUsername(res.body.data.newUser.username);
          expect(user).not.toBeNull();
        });
      });

      describe("error", () => {
        test("should error with invalid data", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: newUserMutation,
              variables: { data: {} },
            });

          expect(res.status).toBe(400);
          expect(res.body.errors[0].message).toMatch(
            `Field "username" of required type`
          );
          expect(res.body.errors[1].message).toMatch(
            `Field "walletAddress" of required type`
          );
        });
      });
    });

    describe("login", () => {
      const loginMutation = `
      mutation Login($data: LoginData!) {
        login(data: $data)
      }
    `;
    });
  });
});
