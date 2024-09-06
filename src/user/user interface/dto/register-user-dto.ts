import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @ApiProperty({ minLength: 2, maxLength: 32, example: 'my username' })
  username: string;

  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({ minLength: 8, maxLength: 32, example: 'my-secret-password' })
  password: string;
}