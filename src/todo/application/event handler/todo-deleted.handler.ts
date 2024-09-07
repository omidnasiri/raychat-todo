import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoDeletedEvent } from "../../domain/event/todo-deleted.event";

@EventsHandler(TodoDeletedEvent)
export class TodoDeletedHandler implements IEventHandler<TodoDeletedEvent> {
  constructor() {}

  handle(event: TodoDeletedEvent) {
    console.log(event);
  }
}