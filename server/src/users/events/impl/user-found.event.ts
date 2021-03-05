import { IEvent } from "@nestjs/cqrs";

export class UserFoundEvent implements IEvent {
  constructor(public readonly id?: string) {}
}
