import { EventsHandler } from "@nestjs/cqrs";
import { UserRegisteredEvent } from "../../domain/event/user-registered.event";

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler {
  constructor() {}

  handle(event: UserRegisteredEvent) {
    console.log(event);
  }
}