import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterUserCommand } from "../register-user.command";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { User } from "src/user/domain/user.model";
import { UserRepository } from "src/user/infrastructure/user.repository";

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RegisterUserCommand) {
    const { username, password } = command;

    await this.userRepository.findByUsername(username).then((item) => {
      if (item) throw new HttpException('Conflict', HttpStatus.CONFLICT);
    });
    
    const result = await this.userRepository.insert(username, password);

    const user = this.publisher.mergeObjectContext(
      new User(result._id.toString(), username, password)
    );

    user.register();
    user.commit();
  }
}