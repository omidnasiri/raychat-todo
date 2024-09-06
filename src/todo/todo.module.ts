import { Module } from '@nestjs/common';
import { TodoCreatedHandler } from './application/event handler/todo-created.handler';
import { InjectionToken } from 'src/injection-token';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './user interface/todo.controller';
import { TodoEntity, TodoSchema } from './infrastructure/todo.entity';
import { TodoMongoRepository } from './infrastructure/todo.mongo-repository';
import { CreateTodoHandler } from './application/command/handler/create-todo.handler';
import { UserModule } from 'src/user/user.module';
import { ListModule } from 'src/list/list.module';

const TodoRepository = {
  provide: InjectionToken.TODO_REPOSITORY,
  useClass: TodoMongoRepository,
}

const handlers = [
  CreateTodoHandler,
  TodoCreatedHandler,
]

@Module({
  imports: [
    ListModule,
    CqrsModule,
    MongooseModule.forFeature([{ name: TodoEntity.CollectionName, schema: TodoSchema }]),
  ],
  controllers: [
    TodoController,
  ],
  providers: [
    TodoRepository,
    ...handlers
  ],
})
export class TodoModule {}
