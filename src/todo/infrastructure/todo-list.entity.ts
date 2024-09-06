import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TodoListEntity {
  static CollectionName = 'todo_lists';
  
  @Prop()
  title: string;

  @Prop()
  userId: string;
}

export const TodoListSchema = SchemaFactory.createForClass(TodoListEntity);