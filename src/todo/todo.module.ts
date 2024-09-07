import { Module } from '@nestjs/common';
import { TodoCreatedHandler } from './application/event handler/todo-created.handler';
import { InjectionToken } from '../libs/injection-token';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './user interface/todo.controller';
import { TodoEntity, TodoSchema } from './infrastructure/todo.entity';
import { TodoMongoRepository } from './infrastructure/todo.mongo-repository';
import { CreateTodoHandler } from './application/command/handler/create-todo.handler';
import { ListModule } from '../list/list.module';
import { BulkDeleteTodoByListHandler } from './application/command/handler/bulk-delete-todo-by-list.handler';
import { TodoDeletedHandler } from './application/event handler/todo-deleted.handler';

const TodoRepository = {
  provide: InjectionToken.TODO_REPOSITORY,
  useClass: TodoMongoRepository,
}

const handlers = [
  CreateTodoHandler,
  BulkDeleteTodoByListHandler,
  TodoCreatedHandler,
  TodoDeletedHandler,
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
