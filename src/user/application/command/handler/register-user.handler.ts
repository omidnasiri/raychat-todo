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
    @InjectModel(UserEntity.CollectionName)
    private readonly userSchema: Model<UserEntity>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RegisterUserCommand) {
    const { username, password } = command;

    await this.userSchema.findOne({ username }).then((item) => {
      if (item) throw new HttpException('Conflict', HttpStatus.CONFLICT);
    });
    
    const userEntity = new this.userSchema({ username, password });
    const result = await userEntity.save();

    const user = this.publisher.mergeObjectContext(
      new User(result._id.toString(), username, password)
    );

    user.register();
    user.commit();
  }
}