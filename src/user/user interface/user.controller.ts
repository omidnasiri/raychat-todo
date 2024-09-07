import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterUserCommand } from "../application/command/register-user.command";
import { ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "./dto/register-user.dto";

@ApiTags('User')
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