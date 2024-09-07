import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FetchListsByUserQuery } from "../fetch-lists-by-user.query";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "../../../../libs/injection-token";
import { ListRepository } from "../../../domain/list-repository";

@QueryHandler(FetchListsByUserQuery)
export class FetchListsByUserHandler implements IQueryHandler<FetchListsByUserQuery> {
  constructor(
    @Inject(InjectionToken.LIST_REPOSITORY)
    private readonly listRepository: ListRepository,
  ) {}

  async execute(query: FetchListsByUserQuery) {
    const { userId } = query;

    return this.listRepository.findByUserId(userId);
  }
}