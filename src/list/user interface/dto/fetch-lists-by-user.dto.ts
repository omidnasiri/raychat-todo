import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class FetchListsByUserDto {
  @IsMongoId()
  @ApiProperty({ example: '66dad13255bc12fbed77144a' })
  userId: string;
}