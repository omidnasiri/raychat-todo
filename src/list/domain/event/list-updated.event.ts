export class ListUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly title: string,
  ) {}
}