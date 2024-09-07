import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class MongoIdQueryDto {
  @IsMongoId()
  @ApiProperty({ example: '66dad13255bc12fbed77144a' })
  id: string;
}