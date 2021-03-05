import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { yellowBright } from "cli-color";
import { Types } from "mongoose";
import { UsersRepository } from "../../users.repository";
import { FindSingleUserQuery } from "../impl/find-single-user.query";

@QueryHandler(FindSingleUserQuery)
export class FindSingleUserHandler
  implements IQueryHandler<FindSingleUserQuery> {
  constructor(private readonly orderRepository: UsersRepository) {}

  async execute(query: FindSingleUserQuery) {
    Logger.log(
      yellowBright("Async FindSingleUserHandler...", "FindSingleUserQuery")
    );

    const { id } = query;
    return this.orderRepository.findOne(new Types.ObjectId(id));
  }
}
