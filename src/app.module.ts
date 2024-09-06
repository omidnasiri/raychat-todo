import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: (ENV == 'production') ? true : false
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService) => {
        const host = configService.get('MONGO_HOST');
        const port = configService.get('MONGO_PORT');
        const user = configService.get('MONGO_USER');
        const password = configService.get('MONGO_PASS');
        const database = configService.get('MONGO_DATABASE');
        if (user && password) {
          return {
            uri: `mongodb+srv://${user}:${password}@${host}:${port}/${database}`,
          };
        }
        return { uri: `mongodb://${host}:${port}/${database}` };
      },
    }),
    UserModule,
    TodoModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ],
})
export class AppModule {}
