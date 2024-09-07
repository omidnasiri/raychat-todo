import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ListDeletedEvent } from "../../domain/event/list-deleted.event";

@EventsHandler(ListDeletedEvent)
export class ListDeletedHandler implements IEventHandler<ListDeletedEvent> {
  constructor() {}

  handle(event: ListDeletedEvent) {
    console.log(event);
  }
}