import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserEntity {
  static ClassName = 'User';

  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);