import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { ListRepository } from "src/list/domain/list-repository";
import { Delete, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { InjectionToken } from "src/injection-token";
import { DeleteListCommand } from "../delete-list.command";

@CommandHandler(DeleteListCommand)
export class DeleteListHandler implements ICommandHandler<DeleteListCommand> {
  constructor(
    @Inject(InjectionToken.LIST_REPOSITORY)
    private readonly listRepository: ListRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteListCommand): Promise<void> {
    const { id } = command;

    const list = await this.listRepository.findByIdAndDelete(id);
    if (!list) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const mergedList = this.publisher.mergeObjectContext(list);

    mergedList.delete();
    mergedList.commit();
  }
}