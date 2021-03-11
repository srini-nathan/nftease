import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import UserResolver from "@models/User/resolver";
import { authChecker } from "@utils/graphql/authChecker";
import { IContext } from "@typescript/graphql";

const createApp = async () => {
  const app = express();

  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
      authChecker,
    }),
    context: ({ req, res }: IContext) => ({
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
