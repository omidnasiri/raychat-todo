import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateTodoListDto } from "./dto/create-todo-list-dto";
import { CreateTodoListCommand } from "../application/command/create-todo-list.command";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Todo List')
@Controller('lists')
export class TodoListController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateTodoListDto) {
    return this.commandBus.execute(new CreateTodoListCommand(dto.title, dto.userId));
  }
}