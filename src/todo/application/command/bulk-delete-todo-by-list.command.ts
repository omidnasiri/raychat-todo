export class BulkDeleteTodoByListCommand {
  constructor(
    public readonly listId: string,
  ) {}
}