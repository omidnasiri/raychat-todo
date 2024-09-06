import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterUserCommand } from "../register-user.command";
import { UserEntity } from "src/user/infrastructure/user.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { User } from "src/user/domain/user.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @InjectModel(UserEntity.ClassName)
    private readonly userModel: Model<UserEntity>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RegisterUserCommand) {
    const { username, password } = command;

    await this.userModel.findOne({ username }).then((item) => {
      if (item) throw new HttpException('Conflict', HttpStatus.CONFLICT);
    });
    
    const userEntity = new this.userModel({ username, password });
    const result = await userEntity.save();

    const user = this.publisher.mergeObjectContext(
      new User(result._id.toString(), command.username, result.password)
    );

    user.register();
    user.commit();
  }
}