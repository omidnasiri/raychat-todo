import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ListUpdatedEvent } from "src/list/domain/event/list-updated.event";

@EventsHandler(ListUpdatedEvent)
export class ListUpdatedHandler implements IEventHandler<ListUpdatedEvent> {
  constructor() {}

  handle(event: ListUpdatedEvent) {
    console.log(event);
  }
}