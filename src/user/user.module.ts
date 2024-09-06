import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './infrastructure/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user interface/user.controller';
import { RegisterUserHandler } from './application/command/handler/register-user.handler';
import { UserRegisteredHandler } from './application/event handler/user-registered.handler';
import { UserMongoRepository } from './infrastructure/user.mongo-repository';
import { InjectionToken } from 'src/injection-token';

const userRepository = {
  provide: InjectionToken.USER_REPOSITORY,
  useClass: UserMongoRepository,
}

const handlers = [
  RegisterUserHandler,
  UserRegisteredHandler,
]

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: UserEntity.CollectionName, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    userRepository,
    ...handlers,
  ],
  exports: [userRepository],
})
export class UserModule {}
