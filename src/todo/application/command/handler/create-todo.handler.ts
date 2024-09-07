import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTodoCommand } from "../create-todo.command";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { InjectionToken } from "../../../../injection-token";
import { TodoRepository } from "../../../domain/todo.repository";
import { ListRepository } from "../../../../list/domain/list-repository";

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    @Inject(InjectionToken.TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
    @Inject(InjectionToken.LIST_REPOSITORY)
    private readonly listRepository: ListRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateTodoCommand) {
    const { title, description, priority, listId } = command;

    const list = await this.listRepository.findById(listId);
    if (!list) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    await this.todoRepository.findByTitleAndListId(title, listId).then((item) => {
      if (item) throw new HttpException('Conflict', HttpStatus.CONFLICT);
    });

    const todo = this.publisher.mergeObjectContext(
      await this.todoRepository.insert(title, description, priority, list)
    );

    todo.create();
    todo.commit();
  }
}