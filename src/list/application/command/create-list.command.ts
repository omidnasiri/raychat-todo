export class CreateListCommand {
  constructor(
    public readonly title: string,
    public readonly userId: string,
  ) {}
}