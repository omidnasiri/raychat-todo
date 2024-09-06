import { AggregateRoot } from "@nestjs/cqrs";
import { UserRegisteredEvent } from "./event/user-registered.event";

export class User extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly email: string,
    private readonly password: string
  ) {
    super();
  }

  register() {
    this.apply(new UserRegisteredEvent(this.id, this.email, this.password));
  }
}