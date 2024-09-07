import { TodoPriority } from "src/todo/domain/todo.model";

export class UpdateTodoCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly priority: TodoPriority,
    public readonly description: string,
  ) {}
}