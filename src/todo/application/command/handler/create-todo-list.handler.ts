import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTodoListCommand } from "../create-todo-list.command";
import { HttpException, HttpStatus } from "@nestjs/common";
import { TodoList } from "src/todo/domain/model/todo-list.model";
import { TodoRepository } from "src/todo/infrastructure/todo-repository";
import { UserRepository } from "src/user/infrastructure/user.repository";

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(
    private readonly todoListRepository: TodoRepository,
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateTodoListCommand) {
    const { userId, title } = command;

    await this.userRepository.findById(userId).then((item) => {
      if (!item) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    });

    await this.todoListRepository.findByTitleAndUserId(title, userId).then((item) => {
      if (item) throw new HttpException('Conflict', HttpStatus.CONFLICT);
    });

    const result = await this.todoListRepository.insert(title, userId);

    const todoList = this.publisher.mergeObjectContext(
      new TodoList(result._id.toString(), title, command.userId)
    );

    todoList.create();
    todoList.commit();
  }
}