import { List } from "src/list/domain/list.model";
import { TodoPriority } from "../todo.model";

export class TodoCreatedEvent {
  constructor(
    private readonly id: string,
    private readonly list: List,
    private readonly title: string,
    private readonly priority: TodoPriority,
    private readonly description: string,
  ) {}
}