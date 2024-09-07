import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { EditListCommand } from "../edit-list.command";
import { ListRepository } from "src/list/domain/list-repository";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { InjectionToken } from "src/libs/injection-token";

@CommandHandler(EditListCommand)
export class EditListHandler implements ICommandHandler<EditListCommand> {
  constructor(
    @Inject(InjectionToken.LIST_REPOSITORY)
    private readonly listRepository: ListRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: EditListCommand) {
    const { id, title } = command;

    const list = await this.listRepository.findByIdAndUpdate(id, title);
    if (!list) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const mergedList = this.publisher.mergeObjectContext(list);

    mergedList.update();
    mergedList.commit();
  }
}