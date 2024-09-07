import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { BulkDeleteTodoByListCommand } from "../bulk-delete-todo-by-list.command";
import { TodoRepository } from "src/todo/domain/todo.repository";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { InjectionToken } from "src/libs/injection-token";
import { ListRepository } from "src/list/domain/list-repository";

@CommandHandler(BulkDeleteTodoByListCommand)
export class BulkDeleteTodoByListHandler implements ICommandHandler<BulkDeleteTodoByListCommand> {
  constructor(
    @Inject(InjectionToken.TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
    @Inject(InjectionToken.LIST_REPOSITORY)
    private readonly listRepository: ListRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: BulkDeleteTodoByListCommand) {
    const { listId } = command;

    await this.listRepository.findById(listId).then((item) => {
      if (item) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    });

    const todos = await this.todoRepository.findByListId(listId);

    await this.todoRepository.bulkDeleteByListId(listId);

    todos.forEach((todo) => {
      const todoEntity = this.publisher.mergeObjectContext(todo);
      todoEntity.delete();
      todoEntity.commit();
    });

  }
}