import "reflect-metadata";
import path from "path";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import { seedDatabase } from "./testing/seed";

// Setup environment variables
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
}

// Setup up mongoose
import createApp from "./app";

const main = async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
  console.log("Database seeding...");

  await seedDatabase();

  let port = process.env.PORT || 8080;

  const app = await createApp();

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

main().catch((err) => console.error(err));
