import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { List } from "../../list/domain/list.model";

@Schema()
export class TodoEntity {
  static CollectionName = 'todos';
  
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  priority: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'List' })
  list: List
}

export const TodoSchema = SchemaFactory.createForClass(TodoEntity);