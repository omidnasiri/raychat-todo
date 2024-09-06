import { AggregateRoot } from "@nestjs/cqrs";
import { List } from "src/list/domain/list.model";
import { TodoCreatedEvent } from "./event/todo-created.event";

export enum TodoPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4,
}

export class Todo extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly list: List,
    private readonly title: string,
    private readonly priority: TodoPriority,
    private readonly description: string,
  ) {
    super();
  }

  create() {
    this.apply(new TodoCreatedEvent(this.id, this.list, this.title, this.priority, this.description));
  }
}