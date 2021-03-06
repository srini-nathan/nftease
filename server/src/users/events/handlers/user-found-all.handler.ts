import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { greenBright } from "cli-color";
import { UserFoundAllEvent } from "../impl/user-found-all.event";

@EventsHandler(UserFoundAllEvent)
export class UserFoundAllHandler implements IEventHandler<UserFoundAllEvent> {
  handle(event: UserFoundAllEvent) {
    Logger.log(greenBright(event, "UserFoundAllEvent"));
  }
}
