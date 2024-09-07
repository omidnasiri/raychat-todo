import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TodoRepository } from "../domain/todo.repository";
import { TodoEntity } from "./todo.entity";
import { List } from "src/list/domain/list.model";
import { Todo } from "../domain/todo.model";

export class TodoMongoRepository implements TodoRepository {
  constructor(
    @InjectModel(TodoEntity.CollectionName)
    private readonly todoSchema: Model<TodoEntity>
  ) {}

  async findByListId(listId: string): Promise<Todo[]> {
    const todoEntities = await this.todoSchema.find({ list: { _id: listId } });
    return todoEntities.map((entity) => this.entityToModel(entity));
  }

  async findByTitleAndListId(title: string, listId: string): Promise<Todo> | null {
    const todoEntity = await this.todoSchema.findOne({ title, list: { _id: listId } });
    return todoEntity ? this.entityToModel(todoEntity): null;
  }

  async insert(title: string, description: string, priority: number, list: List): Promise<Todo> {
    const todoEntity = new this.todoSchema({ title, description, priority, list: { _id: Types.ObjectId.createFromHexString(list.Id) }});
    return this.entityToModel(await todoEntity.save());
  }

  async bulkDeleteByListId(listId: string): Promise<void> {
    await this.todoSchema.deleteMany({ list: { _id: listId } });
  }

  private entityToModel(entity: TodoEntity & { _id: Types.ObjectId }): Todo {
    return new Todo(entity._id.toString(), entity.list, entity.title, entity.priority, entity.description);
  }
}