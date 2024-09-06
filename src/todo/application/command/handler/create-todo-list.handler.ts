import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTodoListCommand } from "../create-todo-list.command";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { UserRepository } from "src/user/domain/user.repository";
import { InjectionToken } from "src/injection-token";
import { TodoRepository } from "src/todo/domain/todo-repository";

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(
    @Inject(InjectionToken.TODO_REPOSITORY)
    private readonly todoListRepository: TodoRepository,
    @Inject(InjectionToken.USER_REPOSITORY)
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

    const todoList = this.publisher.mergeObjectContext(
      await this.todoListRepository.insert(title, userId)
    );

    todoList.create();
    todoList.commit();
  }
}