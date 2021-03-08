import request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { AppModule } from "../app.module";
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from "../../testUtils/MongoTestModule";
import { UsersService } from "./users.service";
import { seedDatabase, SeededDatabase } from "../../testUtils/seed";

describe("UsersController", () => {
  let app: INestApplication;
  let usersService: UsersService;
  let documents: SeededDatabase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, rootMongooseTestModule()],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    usersService = moduleRef.get(UsersService);

    documents = await seedDatabase(app);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });

  describe("/users", () => {
    describe("POST /", () => {
      test("should create a new user", async () => {
        const body = {
          username: "username",
          bio: "This is my bio",
          walletAddress: "Wallet Address",
        };
        const res = await request(app.getHttpServer())
          .post("/users/")
          .send(body);

        expect(res.status).toBe(201);

        expect(res.body.data).toMatchObject(body);

        const user = await usersService.findOne(res.body.data._id);
        expect(user.data).toBeDefined();
      });
    });

    describe("GET /:id", () => {
      test("should successfully get user by id", async () => {
        const res = await request(app.getHttpServer()).get(
          `/users/${documents.users.user_1._id}`
        );

        expect(res.status).toBe(200);

        expect(res.body.data.username).toBe(documents.users.user_1.username);
      });
    });

    describe("GET /", () => {
      test("should get all users", async () => {
        const res = await request(app.getHttpServer()).get("/users");

        expect(res.status).toBe(200);

        expect(res.body.data.length).toBe(
          Object.entries(documents.users).length
        );
      });
    });
  });
});
