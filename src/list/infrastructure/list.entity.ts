import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ListEntity {
  static CollectionName = 'lists';
  
  @Prop()
  title: string;

  @Prop()
  userId: string;
}

export const ListSchema = SchemaFactory.createForClass(ListEntity);