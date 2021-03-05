import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import { CreateUserDto } from "./dto";
import { CreateUserCommand } from "./commands/impl/create-user.command";
import { FindSingleUserQuery } from "./queries/impl/find-single-user.query";

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createUser(dto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }

  async findOne(id: string) {
    return this.queryBus.execute(new FindSingleUserQuery(id));
  }
}
