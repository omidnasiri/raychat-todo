import { Model, Types } from "mongoose";
import { UserEntity } from "./user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { UserRepository } from "../domain/user.repository";
import { User } from "../domain/user.model";

export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(UserEntity.CollectionName)
    private readonly userSchema: Model<UserEntity>
  ) {}

  async findById(id: string): Promise<User> | null {
    const userEntity = await this.userSchema.findById(id);
    return userEntity ? this.entityToModel(userEntity): null;
  }

  async findByUsername(username: string): Promise<User> | null {
    const userEntity = await this.userSchema.findOne({ username })
    return userEntity ? this.entityToModel(userEntity): null;
  }

  async insert(username: string, password: string):  Promise<User> {
    const userEntity = new this.userSchema({ username, password });
    return this.entityToModel(await userEntity.save());
  }

  private entityToModel(entity: UserEntity & { _id: Types.ObjectId; }): User {
    return new User(entity._id.toString(), entity.username, entity.password);
  }
}