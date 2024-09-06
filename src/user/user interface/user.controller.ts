import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { RegisterUserCommand } from "../application/command/register-user.command";
import { RegisterUserDto } from "./dto/register-user-dto";

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async register(@Body() dto: RegisterUserDto) {
    return this.commandBus.execute(new RegisterUserCommand(dto.username, dto.password));
  }
}