import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListEntity, TodoListSchema } from './infrastructure/todo-list.entity';
import { TodoListController } from './user interface/todo-list.controller';
import { TodoListCreatedHandler } from './application/event handler/todo-list-created.handler';
import { CreateTodoListHandler } from './application/command/handler/create-todo-list.handler';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { TodoRepository } from './infrastructure/todo-repository';

const handlers = [
  CreateTodoListHandler,
  TodoListCreatedHandler,
]

@Module({
  imports: [
    UserModule,
    CqrsModule,
    MongooseModule.forFeature([{ name: TodoListEntity.CollectionName, schema: TodoListSchema }]),
  ],
  controllers: [
    TodoListController,
  ],
  providers: [
    TodoRepository,
    ...handlers
  ],
})
export class TodoModule {}
