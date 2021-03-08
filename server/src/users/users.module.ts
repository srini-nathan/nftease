import { Module, OnModuleInit } from "@nestjs/common";
import { CqrsModule, EventBus } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";

import { EventStoreModule, EventStoreService } from "../core/event-store";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UserSchema } from "./users.schema";
import { UsersService } from "./users.service";
import { QueryHandlers } from "./queries/handlers";
import { UserCreatedEvent } from "./events/impl/user-created.event";
import { UserFoundEvent } from "./events/impl/user-found.event";
import { UserFoundAllEvent } from "./events/impl/user-found-all.event";
import { CreateUserDto } from "./dto";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    EventStoreModule.forFeature(),
  ],
  controllers: [UsersController],
  providers: [
    UsersRepository,
    UsersService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class UsersModule implements OnModuleInit {
  public eventHandlers = {
    UserCreatedEvent: (data: CreateUserDto) => new UserCreatedEvent(data),
    UserFoundEvent: (data?: string) => new UserFoundEvent(data),
    UserFoundAllEvent: () => new UserFoundAllEvent(),
  };

  constructor(
    private readonly eventStore: EventStoreService,
    private readonly eventBus: EventBus
  ) {}

  onModuleInit() {
    this.eventStore.setEventHandlers(this.eventHandlers);
    this.eventStore.bridgeEventsTo((this.eventBus as any).subject$);
    this.eventBus.publisher = this.eventStore;
  }
}
