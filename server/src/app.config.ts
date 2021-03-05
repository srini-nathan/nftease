import { ConfigEnv } from "./core/config";

const env: { [k: string]: ConfigEnv } = {
  development: {
    name: "users-service",
    prefix: "api",
    port: 3000,
    mongo: {
      database: "users",
    },
    eventStore: {
      credentials: {
        username: "admin",
        password: "changeit",
      },
    },
  },
};
env.production = {
  ...env.development,
  port: 3000,
  eventStore: {
    credentials: {
      username: "admin",
      password: "changeit",
    },
  },
};
export const config: { [k: string]: ConfigEnv } = env;
