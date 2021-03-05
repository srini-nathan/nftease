import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { greenBright } from "cli-color";
import { UserFoundEvent } from "../impl/user-found.event";

@EventsHandler(UserFoundEvent)
export class UserFoundHandler implements IEventHandler<UserFoundEvent> {
  handle(event: UserFoundEvent) {
    Logger.log(greenBright(event, "UserFoundEvent"));
  }
}
