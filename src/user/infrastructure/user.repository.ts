import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UserEntity } from "./user.entity";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.CollectionName)
    private readonly userSchema: Model<UserEntity>
  ) {}

  async findById(id: string) {
    return this.userSchema.findById(id);
  }

  async findByUsername(username: string) {
    return this.userSchema.findOne({ username })
  }

  async insert(username: string, password: string) {
    const userEntity = new this.userSchema({ username, password });
    return userEntity.save();
  }
}