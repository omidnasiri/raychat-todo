import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectionToken } from "src/libs/injection-token";
import { TodoRepository } from "src/todo/domain/todo.repository";
import { UpdateTodoCommand } from "../update-todo.command";

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    @Inject(InjectionToken.TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateTodoCommand) {
    const { id, title, priority, description } = command;

    const todo = await this.todoRepository.findByIdAndUpdate(id, title, description, priority);
    if (!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const mergedTodo = this.publisher.mergeObjectContext(todo);

    mergedTodo.delete();
    mergedTodo.commit();
  }
}