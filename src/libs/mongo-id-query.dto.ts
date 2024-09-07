import { IsMongoId } from "class-validator";

export class MongoIdQueryDto {
  @IsMongoId()
  id: string;
}