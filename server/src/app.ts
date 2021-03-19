import express from "express";
import cors from "cors";
import { GraphQLError, GraphQLScalarType } from "graphql";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { buildSchema, buildTypeDefsAndResolvers } from "type-graphql";
import decode from "jwt-decode";

import { authChecker } from "@utils/graphql/authChecker";
import { IContext } from "@typescript/graphql";

import UserResolver from "@models/User/resolver";
import MediaResolver from "@models/Media/resolver";
import { graphqlUploadExpress } from "graphql-upload";
import User, { UserDocument } from "@models/User";
import FileResolver from "@models/File/resolver";

const createApp = async () => {
  const app = express();

  app.use(cors());

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UserResolver, MediaResolver, FileResolver],
    authChecker,
  });

  const schema = makeExecutableSchema({
    resolvers: resolvers,
    typeDefs,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }: IContext) => {
      const token = req.headers.authorization;

      let user: UserDocument | null = null;

      if (token) {
        const decoded: any = decode(token);

        user = await User.getById(decoded?.userId);
      }

      return {
        user,
        req,
        res,
      };
    },
    uploads: false,
  });

  app.use(
    graphqlUploadExpress({
      maxFileSize: 10000000, // 10mb
      maxFiles: 20,
    })
  );
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  return app;
};

export default createApp;
