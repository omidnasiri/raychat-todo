import { TodoPriority } from "src/todo/domain/todo.model";

export class CreateTodoCommand {
  constructor(
    public readonly title: string,
    public readonly listId: string,
    public readonly description: string,
    public readonly priority: TodoPriority,
  ) {}
}