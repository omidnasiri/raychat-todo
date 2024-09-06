import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateTodoListDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @ApiProperty({ minLength: 2, maxLength: 32, example: 'my todo list title' })
  title: string;

  @IsString()
  @Length(24, 24)
  @ApiProperty({ minLength: 2, maxLength: 32, example: '66dad13255bc12fbed77144a' })
  userId: string;
}