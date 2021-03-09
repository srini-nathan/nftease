import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../impl/user-created.event";
import { Logger } from "@nestjs/common";
import { greenBright } from "cli-color";
import { EventStore } from "core/event-store/event-store";

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    Logger.log(greenBright(event, "UserCreatedEvent"));
  }
}
