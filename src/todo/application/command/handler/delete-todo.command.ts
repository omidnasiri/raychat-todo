import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DeleteTodoCommand } from "../delete-todo.command";
import { InjectionToken } from "../../../../libs/injection-token";
import { TodoRepository } from "../../../domain/todo.repository";

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(
    @Inject(InjectionToken.TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteTodoCommand) {
    const { id } = command;

    const todo = await this.todoRepository.findByIdAndDelete(id);
    if (!todo) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const mergedTodo = this.publisher.mergeObjectContext(todo);

    mergedTodo.delete();
    mergedTodo.commit();
  }
}