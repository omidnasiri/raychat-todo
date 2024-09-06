import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoListCreatedEvent } from "src/todo/domain/event/todo-list-created.event";

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedHandler implements IEventHandler<TodoListCreatedEvent> {
  constructor() {}

  handle(event: TodoListCreatedEvent) {
    console.log(event);
  }
}