import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import UserResolver from "@models/User/resolver";

const createApp = async () => {
  const app = express();

  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }: { req: any; res: any }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  return app;
};

export default createApp;
