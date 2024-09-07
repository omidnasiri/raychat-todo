import { AggregateRoot } from "@nestjs/cqrs";
import { ListCreatedEvent } from "./event/list-created.event";
import { ListUpdatedEvent } from "./event/list-updated.event";
import { ListDeletedEvent } from "./event/list-deleted.event";

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

  update() {
    this.apply(new ListUpdatedEvent(this.id, this.title));
  }

  delete() {
    this.apply(new ListDeletedEvent(this.id));
  }
}