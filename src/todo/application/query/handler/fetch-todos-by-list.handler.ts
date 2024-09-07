import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FetchTodosByListQuery } from "../fetch-todos-by-list.query";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "src/libs/injection-token";
import { TodoRepository } from "src/todo/domain/todo.repository";

@QueryHandler(FetchTodosByListQuery)
export class FetchTodosByListHandler implements IQueryHandler<FetchTodosByListQuery> {
  constructor(
    @Inject(InjectionToken.TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(query: FetchTodosByListQuery) {
    const { listId } = query;

    return this.todoRepository.findByListId(listId);
  }
}