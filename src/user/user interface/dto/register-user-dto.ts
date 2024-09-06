import { IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  username: string;

  @MinLength(8)
  @MaxLength(32)
  password: string;
}