import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength } from "class-validator";

export class UpdateListDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @ApiProperty({ minLength: 2, maxLength: 32, example: 'my updated todo list title' })
  title: string;
}