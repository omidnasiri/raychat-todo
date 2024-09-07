import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsEnum, IsMongoId } from "class-validator";
import { TodoPriority } from "../../domain/todo.model";

export class UpdateTodoDto {
  @IsMongoId()
  @ApiProperty({ example: '66dad13255bc12fbed77144a' })
  id: string;

  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @ApiProperty({ minLength: 2, maxLength: 32, example: 'my updated todo list title' })
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(512)
  @ApiProperty({ minLength: 2, maxLength: 512, example: 'my updated todo list description' })
  description: string;

  @IsEnum(TodoPriority)
  @ApiProperty({ enum: TodoPriority, example: TodoPriority.HIGH })
  priority: TodoPriority;
}