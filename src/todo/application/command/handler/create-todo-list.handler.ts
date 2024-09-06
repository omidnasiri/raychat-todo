import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTodoListCommand } from "../create-todo-list.command";
import { TodoListEntity } from "src/todo/infrastructure/todo-list.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { TodoList } from "src/todo/domain/model/todo-list.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(
    @InjectModel(TodoListEntity.CollectionName)
    private readonly todoListSchema: Model<TodoListEntity>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateTodoListCommand) {
    const { userId, title } = command;

    await this.todoListSchema.findOne({ title, userId }).then((item) => {
      if (item) throw new HttpException('Conflict', HttpStatus.CONFLICT);
    });

    const todoListEntity = new this.todoListSchema({ userId, title });
    const result = await todoListEntity.save();

    const todoList = this.publisher.mergeObjectContext(
      new TodoList(result._id.toString(), title, command.userId)
    );

    todoList.create();
    todoList.commit();
  }
}