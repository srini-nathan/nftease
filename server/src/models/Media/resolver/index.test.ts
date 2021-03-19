import request from "supertest";
import MongoMemoryServer from "mongodb-memory-server-core";
import fs, { read } from "fs";
import path, { extname } from "path";
import { Readable } from "stream";
import { LocalFileData } from "get-file-object-from-local-path";
import { contentType } from "mime-types";

import MongoTestModule from "@testing/MongoTestModule";
import { seedDatabase, SeededDatabase } from "@testing/seed";
import createApp from "../../../app";
import userPrivateHex from "@testing/seed/userPrivateHex";
import { jestLogin } from "@testing/jestLogin";
import { FileUpload } from "graphql-upload";

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

describe("Media Resolver", () => {
  describe("Mutations", () => {
    describe("newMedia", () => {
      const newMediaMutation = `
        mutation NewMedia($data: NewMediaData!) {
          newMedia(data: $data)
        }
      `;

      const graphql = (
        query: string,
        variables: { data: { [x: string]: any } } = { data: {} }
      ) => {
        const map = Object.assign(
          {},
          Object.keys(variables.data).map((key) => [`variables.data.${key}`])
        );
        console.log(map);
        const req = request(app)
          .post("/graphql")
          .field("operations", JSON.stringify({ query }))
          .field("map", JSON.stringify(map));

        Object.values(variables.data).forEach((value, i) => {
          if (contentType(extname(value))) {
            req.attach(`${i}`, value);
          } else {
            console.log(value);
            req.field(`${i}`, value);
          }
        });

        console.log(req);

        return req;
      };

      describe("success", () => {
        test.skip("should successfully create a new user", async () => {
          /**
           * @todo
           */
          const filename = "first-image.jpg";
          // const res = await graphql(newMediaMutation, {
          //   data: {
          //     tokenFile: path.resolve(
          //       __dirname,
          //       `../../../testing/assets/${filename}`
          //     ),
          //     previewFile: path.resolve(
          //       __dirname,
          //       `../../../testing/assets/${filename}`
          //     ),
          //     title: "Title",
          //   },
          // });
          const file = fs.createReadStream(
            path.resolve(__dirname, `../../../testing/assets/${filename}`)
          );
          const req = request(app)
            .post("/graphql")
            .field(
              "operations",
              JSON.stringify({
                query: newMediaMutation,
                variables: {
                  data: {
                    title: null,
                    previewFile: null,
                    tokenFile: null,
                  },
                },
              })
            )
            .field(
              "map",
              JSON.stringify({
                title: ["variables.data.title"],
                previewFile: ["variables.data.previewFile"],
                tokenFile: ["variables.data.tokenFile"],
              })
            )
            .field("title", "Title")
            .attach(
              "previewFile",
              path.resolve(__dirname, `../../../testing/assets/${filename}`)
            )
            .attach(
              "tokenFile",
              path.resolve(__dirname, `../../../testing/assets/${filename}`)
            );
          console.log(req);
          const res = await req;

          console.log(res);
          // expect(res.status).toBe(200);
        });
      });

      describe("error", () => {});
    });
  });
});
