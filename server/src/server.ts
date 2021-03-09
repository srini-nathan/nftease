import "reflect-metadata";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
// import { PostgresPersistenceEngine } from "nact-persistence-postgres";

import app from "./app";
import { seedDatabase } from "./testUtils/seed";

// Setup environment variables
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
}

// Setup up mongoose
import UserResolver from "./models/User/resolver";

let apolloServer: any;
const main = async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
  console.log("Database seeding...");

  await seedDatabase();

  let port = process.env.PORT || 8080;

  app.use(cors());

  apolloServer = new ApolloServer({
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

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

main().catch((err) => console.error(err));

export { apolloServer };
