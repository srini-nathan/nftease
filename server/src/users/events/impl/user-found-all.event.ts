import { IEvent } from "@nestjs/cqrs";

export class UserFoundAllEvent implements IEvent {
  constructor() {}
}
