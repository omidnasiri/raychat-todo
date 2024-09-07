import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoUpdatedEvent } from "../../domain/event/todo-updated.event";

@EventsHandler(TodoUpdatedEvent)
export class TodoUpdatedHandler implements IEventHandler<TodoUpdatedEvent> {
  constructor() {}

  handle(event: TodoUpdatedEvent) {
    console.log(event);
  }
}