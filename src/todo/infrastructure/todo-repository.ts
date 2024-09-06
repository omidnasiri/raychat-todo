import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TodoListEntity } from "./todo-list.entity";

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(TodoListEntity.CollectionName)
    private readonly userSchema: Model<TodoListEntity>
  ) {}

  async findByTitleAndUserId(title: string, userId: string) {
    return this.userSchema.findOne({ title, userId })
  }

  async insert(title: string, userId: string) {
    const todoListEntity = new this.userSchema({ title, userId });
    return todoListEntity.save();
  }
}