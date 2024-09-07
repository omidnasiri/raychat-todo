import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterUserCommand } from "../register-user.command";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { UserRepository } from "src/user/domain/user.repository";
import * as bcrypt from 'bcrypt';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
  @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RegisterUserCommand) {
    const { username, password } = command;

    await this.userRepository.findByUsername(username).then((item) => {
      if (item) throw new HttpException('Conflict', HttpStatus.CONFLICT);
    });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = this.publisher.mergeObjectContext(
      await this.userRepository.insert(username, passwordHash)
    );

    user.register();
    user.commit();
  }
}