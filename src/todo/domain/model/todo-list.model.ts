import { AggregateRoot } from "@nestjs/cqrs";
import { TodoListCreatedEvent } from "../event/todo-list-created.event";

export class TodoList extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly userId: string,
  ) {
    super();
  }

  create() {
    this.apply(new TodoListCreatedEvent(this.id, this.title, this.userId));
  }
}