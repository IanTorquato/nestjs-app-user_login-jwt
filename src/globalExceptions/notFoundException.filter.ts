import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(EntityNotFoundError)
class NotFoundException implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.NOT_FOUND;

    Logger.error(exception.message);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Nenhum registro encontrado',
    });
  }
}

export { NotFoundException };
