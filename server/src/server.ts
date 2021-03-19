import "reflect-metadata";
import path from "path";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import sigUtils from "eth-sig-util";

import { seedDatabase } from "./testing/seed";

// Setup environment variables
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
} else if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: path.join(__dirname, "..", ".env.test") });
}

// Setup up mongoose
import createApp from "./app";
import userPrivateHex from "@testing/seed/userPrivateHex";

const main = async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
  console.log("Database seeding...");

  const documents = await seedDatabase();

  const user1PrivateKey = Buffer.from(userPrivateHex.user_1, "hex");
  const signature = sigUtils.personalSign(user1PrivateKey, {
    data: documents.users.user_1.nonce,
  });
  const token = await documents.users.user_1.generateJWT(signature);
  console.log("User 1 Authorization Token", token);

  let port = process.env.PORT || 8080;

  const app = await createApp();

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

main().catch((err) => console.error(err));
