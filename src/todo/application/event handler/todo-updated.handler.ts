import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoUpdatedEvent } from "src/todo/domain/event/todo-updated.event";

@EventsHandler(TodoUpdatedEvent)
export class TodoUpdatedHandler implements IEventHandler<TodoUpdatedEvent> {
  constructor() {}

  handle(event: TodoUpdatedEvent) {
    console.log(event);
  }
}