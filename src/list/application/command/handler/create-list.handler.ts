import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateListCommand } from "../create-list.command";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { UserRepository } from "../../../../user/domain/user.repository";
import { InjectionToken } from "../../../../injection-token";
import { ListRepository } from "../../../domain/list-repository";

@CommandHandler(CreateListCommand)
export class CreateListHandler implements ICommandHandler<CreateListCommand> {
  constructor(
    @Inject(InjectionToken.LIST_REPOSITORY)
    private readonly listRepository: ListRepository,
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateListCommand) {
    const { userId, title } = command;

    await this.userRepository.findById(userId).then((item) => {
      if (!item) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    });

    await this.listRepository.findByTitleAndUserId(title, userId).then((item) => {
      if (item) throw new HttpException('Conflict', HttpStatus.CONFLICT);
    });

    const list = this.publisher.mergeObjectContext(
      await this.listRepository.insert(title, userId)
    );

    list.create();
    list.commit();
  }
}