import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateListCommand } from "../application/command/create-list.command";
import { ApiTags } from "@nestjs/swagger";
import { DeleteListCommand } from "../application/command/delete-list.command";
import { EditListCommand } from "../application/command/edit-list.command";
import { CreateListDto } from "./dto/create-list.dto";
import { EditListDto } from "./dto/edit-list.dto";

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

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: EditListDto) {
    return this.commandBus.execute(new EditListCommand(id, dto.title));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteListCommand(id));
  }
}