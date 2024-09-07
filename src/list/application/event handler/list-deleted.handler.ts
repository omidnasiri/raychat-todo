import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ListDeletedEvent } from "src/list/domain/event/list-deleted.event";

@EventsHandler(ListDeletedEvent)
export class ListDeletedHandler implements IEventHandler<ListDeletedEvent> {
  constructor() {}

  handle(event: ListDeletedEvent) {
    console.log(event);
  }
}