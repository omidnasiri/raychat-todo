import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TodoListEntity } from "./todo-list.entity";
import { TodoRepository } from "../domain/todo-repository";
import { TodoList } from "../domain/model/todo-list.model";

export class TodoMongoRepository implements TodoRepository{
  constructor(
    @InjectModel(TodoListEntity.CollectionName)
    private readonly userSchema: Model<TodoListEntity>
  ) {}

  async findByTitleAndUserId(title: string, userId: string): Promise<TodoList> | null {
    const todoListEntity = await this.userSchema.findOne({ title, userId })
    return todoListEntity ? this.entityToModel(todoListEntity): null;
  }

  async insert(title: string, userId: string): Promise<TodoList> {
    const todoListEntity = new this.userSchema({ title, userId });
    return this.entityToModel(await todoListEntity.save());
  }

  private entityToModel(entity: TodoListEntity & { _id: Types.ObjectId }): TodoList {
    return new TodoList(entity._id.toString(), entity.title, entity.userId);
  }
}