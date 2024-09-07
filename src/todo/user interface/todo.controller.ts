import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateTodoCommand } from "../application/command/create-todo.command";
import { ApiTags } from "@nestjs/swagger";
import { CreateTodoDto } from "./dto/create-todo.dto";

@ApiTags('Todo Item')
@Controller('todo')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async create(@Body() body: CreateTodoDto) {
    return this.commandBus.execute(new CreateTodoCommand(body.title, body.listId, body.description, body.priority));
  }
}