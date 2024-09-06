import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoCreatedEvent } from "src/todo/domain/event/todo-created.event";

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedHandler implements IEventHandler<TodoCreatedEvent> {
  constructor() {}

  handle(event: TodoCreatedEvent) {
    console.log(event);
  }
}