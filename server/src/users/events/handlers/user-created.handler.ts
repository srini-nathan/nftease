import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../impl/user-created.event";
import { Logger } from "@nestjs/common";
import { greenBright } from "cli-color";

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    Logger.log(greenBright(event, "UserCreatedEvent"));
  }
}
