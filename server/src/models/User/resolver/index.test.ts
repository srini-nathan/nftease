import request from "supertest";
import MongoMemoryServer from "mongodb-memory-server-core";
import sigUtil from "eth-sig-util";
import decode from "jwt-decode";

import MongoTestModule from "@testing/MongoTestModule";
import { seedDatabase, SeededDatabase } from "@testing/seed";
import createApp from "../../../app";
import User from "..";
import userPrivateHex from "@testing/seed/userPrivateHex";
import { jestLogin } from "@testing/jestLogin";

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

      describe("success", () => {
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

      describe("success", () => {
        test("should successfully get token", async () => {
          const privKey = Buffer.from(userPrivateHex.user_1, "hex");
          const signature = sigUtil.personalSign(privKey, {
            data: documents.users.user_1.nonce,
          });

          const oldNonce = documents.users.user_1.nonce;
          const res = await request(app)
            .post("/graphql")
            .send({
              query: loginMutation,
              variables: {
                data: {
                  walletAddress: documents.users.user_1.walletAddress,
                  signature,
                },
              },
            });

          expect(res.status).toBe(200);
          expect(res.body.data.login).toBeDefined();

          const decoded: any = decode(res.body.data.login);

          expect(decoded.userId).toBe(documents.users.user_1._id.toString());

          const user = await User.getById(decoded.userId);
          expect(user).not.toBeNull();

          expect(user!.nonce).not.toEqual(oldNonce);
        });
      });

      describe("error", () => {
        test("should error if signature is invalid", async () => {
          const signature = "s".repeat(132);
          const res = await request(app)
            .post("/graphql")
            .send({
              query: loginMutation,
              variables: {
                data: {
                  walletAddress: documents.users.user_1.walletAddress,
                  signature,
                },
              },
            });

          expect(res.status).toBe(200);
          expect(res.body.errors[0].message).toBe("Invalid signature length");
        });
      });
    });

    describe("userBio", () => {
      beforeAll(async () => {
        documents = await seedDatabase();
      });

      const userBioMutation = `
        mutation UserBio($data: UserBioData!) {
          userBio(data: $data) {
            _id
            bio
          }
        }
      `;

      describe("success", () => {
        test("should successfully update a users bio", async () => {
          const user = documents.users.user_1;
          const token = await jestLogin(
            app,
            user.walletAddress,
            user.nonce,
            userPrivateHex.user_1
          );

          const data = {
            id: user._id,
            bio: "This is the new bio",
          };
          const res = await request(app)
            .post("/graphql")
            .send({
              query: userBioMutation,
              variables: {
                data,
              },
            })
            .set("authorization", token);

          expect(res.body.data.userBio.bio).toBe(data.bio);

          const newUser = await User.getById(res.body.data.userBio._id);
          expect(newUser).not.toBeNull();
          expect(newUser?.bio).toBe(data.bio);
        });
      });

      describe("error", () => {
        test("should error if not authorized", async () => {
          const data = {
            id: documents.users.user_1._id,
            bio: "This is the new bio",
          };
          const res = await request(app).post("/graphql").send({
            query: userBioMutation,
            variables: {
              data,
            },
          });

          expect(res.body.errors[0].message).toBe(
            "Access denied! You need to be authorized to perform this action!"
          );
        });
      });
    });
  });
});
