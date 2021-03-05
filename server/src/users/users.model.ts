import { AggregateRoot } from "@nestjs/cqrs";
import { UserCreatedEvent } from "./events/impl/user-created.event";
import { UserFoundEvent } from "./events/impl/user-found.event";

export class UserRoot extends AggregateRoot {
  data: any;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data: any) {
    this.data = data;
  }

  createdUser() {
    this.apply(new UserCreatedEvent(this.data));
  }

  foundUser() {
    this.apply(new UserFoundEvent(this.data));
  }
}
