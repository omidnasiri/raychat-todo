import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateListCommand } from "../application/command/create-list.command";
import { ApiTags } from "@nestjs/swagger";
import { DeleteListCommand } from "../application/command/delete-list.command";
import { UpdateListCommand } from "../application/command/update-list.command";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { MongoIdQueryDto } from "../../libs/mongo-id-query.dto";
import { FetchListsByUserDto } from "./dto/fetch-lists-by-user.dto";
import { FetchListsByUserQuery } from "../application/query/fetch-lists-by-user.query";

@ApiTags('Todo List')
@Controller('lists')
export class ListController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async create(@Body() body: CreateListDto) {
    return this.commandBus.execute(new CreateListCommand(body.title, body.userId));
  }

  @Put(':id')
  async update(@Param(new ValidationPipe()) param: MongoIdQueryDto, @Body() body: UpdateListDto) {
    return this.commandBus.execute(new UpdateListCommand(param.id, body.title));
  }

  @Delete(':id')
  async delete(@Param(new ValidationPipe()) param: MongoIdQueryDto) {
    return this.commandBus.execute(new DeleteListCommand(param.id));
  }

  @Get()
  async fetchByUserId(@Query() body: FetchListsByUserDto) {
    return this.queryBus.execute(new FetchListsByUserQuery(body.userId));
  }
}