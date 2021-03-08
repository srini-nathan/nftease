import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { yellowBright } from "cli-color";
import { UsersRepository } from "../../users.repository";
import { FindAllUsersQuery } from "../impl/find-all-users.query";

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersHandler implements IQueryHandler<FindAllUsersQuery> {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute() {
    Logger.log(
      yellowBright("Async FindAllUsersHandler...", "FindAllUsersQuery")
    );

    return this.userRepository.findAll();
  }
}
