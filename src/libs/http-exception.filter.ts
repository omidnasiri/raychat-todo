import {
  Catch,
  Logger,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    this.logger.warn({
      request: {
        method: request.method,
        url: request.url,
        body: request.body,
      }, exception },
      exception.stack
    );
    super.catch(exception, host);
  }
}