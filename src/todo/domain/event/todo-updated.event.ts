import { TodoPriority } from "../todo.model";

export class TodoUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly priority: TodoPriority,
    public readonly description: string,
  ) {}
}