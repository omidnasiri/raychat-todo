import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ListCreatedEvent } from "src/list/domain/event/list-created.event";

@EventsHandler(ListCreatedEvent)
export class ListCreatedHandler implements IEventHandler<ListCreatedEvent> {
  constructor() {}

  handle(event: ListCreatedEvent) {
    console.log(event);
  }
}