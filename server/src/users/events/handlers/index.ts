import { UserFoundAllHandler } from "./user-found-all.handler";
import { UserCreatedHandler } from "./user-created.handler";
import { UserFoundHandler } from "./user-found.handler";

export const EventHandlers = [
  UserCreatedHandler,
  UserFoundAllHandler,
  UserFoundHandler,
];
