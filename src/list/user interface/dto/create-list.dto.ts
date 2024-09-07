import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString, MaxLength, MinLength } from "class-validator";

export class CreateListDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @ApiProperty({ minLength: 2, maxLength: 32, example: 'my todo list title' })
  title: string;

  @IsMongoId()
  @ApiProperty({ example: '66dad13255bc12fbed77144a' })
  userId: string;
}