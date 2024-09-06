import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateListDto } from "./dto/create-list-dto";
import { CreateListCommand } from "../application/command/create-list.command";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Todo List')
@Controller('lists')
export class ListController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateListDto) {
    return this.commandBus.execute(new CreateListCommand(dto.title, dto.userId));
  }
}