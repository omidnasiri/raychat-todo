import { Body, Controller, Delete, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateTodoCommand } from "../application/command/create-todo.command";
import { ApiTags } from "@nestjs/swagger";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { UpdateTodoCommand } from "../application/command/update-todo.command";
import { DeleteTodoCommand } from "../application/command/delete-todo.command";
import { MongoIdQueryDto } from "src/libs/mongo-id-query.dto";

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

  @Put()
  async update(@Body() body: UpdateTodoDto) {
    return this.commandBus.execute(new UpdateTodoCommand(body.id, body.title, body.priority, body.description));
  }

  @Delete(':id')
  async delete(@Param(new ValidationPipe()) param: MongoIdQueryDto) {
    return this.commandBus.execute(new DeleteTodoCommand(param.id));
  }
}