import { Delete, Module } from '@nestjs/common';
import { CreateListHandler } from './application/command/handler/create-list.handler';
import { ListCreatedHandler } from './application/event handler/list-created.handler';
import { InjectionToken } from '../injection-token';
import { ListMongoRepository } from './infrastructure/list.mongo-repository';
import { UserModule } from '../user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ListEntity, ListSchema } from './infrastructure/list.entity';
import { ListController } from './user interface/list.controller';
import { EditListHandler } from './application/command/handler/edit-list.handler';
import { DeleteListHandler } from './application/command/handler/delete-list.handler';
import { ListDeletedHandler } from './application/event handler/list-deleted.handler';
import { ListUpdatedHandler } from './application/event handler/list-updated.handler';

const listRepository = {
  provide: InjectionToken.LIST_REPOSITORY,
  useClass: ListMongoRepository,
}

const handlers = [
  CreateListHandler,
  EditListHandler,
  DeleteListHandler,
  ListCreatedHandler,
  ListUpdatedHandler,
  ListDeletedHandler,
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
    listRepository,
    ...handlers
  ],
  exports: [listRepository],
})
export class ListModule {}
