import { Logger } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { yellowBright } from "cli-color";
import { UsersRepository } from "../../users.repository";
import { CreateUserCommand } from "../impl/create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateUserCommand) {
    Logger.log(yellowBright("Async CreateUserHandler...", "CreateUserCommand"));

    const { userDto } = command;
    const user = this.publisher.mergeObjectContext(
      await this.userRepository.createOne(userDto)
    );
    user.createdUser();
    user.commit();

    return user;
  }
}
