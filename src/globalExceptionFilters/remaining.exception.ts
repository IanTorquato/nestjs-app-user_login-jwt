import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
class InternalServerException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error(exception.message);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Falha no servidor, contatar responsável.',
    });
  }
}

export { InternalServerException };
