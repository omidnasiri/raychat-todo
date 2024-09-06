import { Module } from '@nestjs/common';
import { CreateListHandler } from './application/command/handler/list.handler';
import { ListCreatedHandler } from './application/event handler/list-created.handler';
import { InjectionToken } from 'src/injection-token';
import { ListMongoRepository } from './infrastructure/list.mongo-repository';
import { UserModule } from 'src/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ListEntity, ListSchema } from './infrastructure/list.entity';
import { ListController } from './user interface/list.controller';

const TodoRepository = {
  provide: InjectionToken.LIST_REPOSITORY,
  useClass: ListMongoRepository,
}

const handlers = [
  CreateListHandler,
  ListCreatedHandler,
]

@Module({
  imports: [
    UserModule,
    CqrsModule,
    MongooseModule.forFeature([{ name: ListEntity.CollectionName, schema: ListSchema }]),
  ],
  controllers: [
    ListController,
  ],
  providers: [
    TodoRepository,
    ...handlers
  ],
})
export class ListModule {}
