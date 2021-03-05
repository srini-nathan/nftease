import { IEvent } from "@nestjs/cqrs";
import { CreateUserDto } from "../../dto";

export class UserCreatedEvent implements IEvent {
  constructor(public readonly userDto: CreateUserDto) {}
}
