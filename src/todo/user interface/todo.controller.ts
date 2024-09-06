import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateTodoDto } from "./dto/create-todo-dto";
import { CreateTodoCommand } from "../application/command/create-todo.command";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Todo Item')
@Controller('todo')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateTodoDto) {
    return this.commandBus.execute(new CreateTodoCommand(dto.title, dto.listId, dto.description, dto.priority));
  }
}