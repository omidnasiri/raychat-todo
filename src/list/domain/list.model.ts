import { AggregateRoot } from "@nestjs/cqrs";
import { ListCreatedEvent } from "./event/list-created.event";

export class List extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly userId: string,
  ) {
    super();
  }

  get Id() {
    return this.id;
  }

  create() {
    this.apply(new ListCreatedEvent(this.id, this.title, this.userId));
  }
}