import {
  Catch,
  Logger,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    this.logger.warn(`${request.url} ${exception}`);
    super.catch(exception, host);
  }
}