import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsString, MaxLength, MinLength } from "class-validator";
import { TodoPriority } from "../../domain/todo.model";

export class CreateTodoDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @ApiProperty({ minLength: 2, maxLength: 32, example: 'my todo item title' })
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(512)
  @ApiProperty({ minLength: 2, maxLength: 512, example: 'my todo item description' })
  description: string;

  @IsEnum(TodoPriority)
  @ApiProperty({ example: '1' })
  priority: TodoPriority;

  @IsMongoId()
  @ApiProperty({ example: '66dad13255bc12fbed77144a' })
  listId: string;
}