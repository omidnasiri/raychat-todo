import { AggregateRoot } from "@nestjs/cqrs";
import { UserRegisteredEvent } from "./event/user-registered.event";

export class User extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly username: string,
    private readonly password: string
  ) {
    super();
  }

  get Id() {
    return this.id;
  }

  get Username() {
    return this.username;
  }

  register() {
    this.apply(new UserRegisteredEvent(this.id, this.username, this.password));
  }
}