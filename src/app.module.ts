import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './libs/http-exception.filter';
import { AppSaga } from './app.saga';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (ENV == 'test') ? '.env.test' : '.env.dev',
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
        const database = configService.get('MONGO_DB');
        if (user && password) {
          if (host.startsWith('mongodb+srv')) {
            return {
              uri: `mongodb+srv://${user}:${password}@${host}/${database}`,
            };
          }
          return {
            uri: `mongodb://${user}:${password}@${host}:${port}/${database}`,
          };
        }
        if (host.startsWith('mongodb+srv')) {
          return { uri: `mongodb+srv://${host}/${database}` };
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
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    AppSaga,
  ],
})
export class AppModule {}
