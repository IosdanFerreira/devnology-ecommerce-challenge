import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { ConflictError } from 'src/errors';
import { BaseResponse } from 'src/utils/baseResponse.utils';
import { handleDatabaseErrors } from 'src/utils/HandleDatabaseError';
import { isPrismaError } from 'src/utils/isPrismaError';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (isPrismaError(exception)) {
      const handledError = isPrismaError(exception)
        ? handleDatabaseErrors(exception)
        : exception;

      const status =
        handledError instanceof ConflictError
          ? HttpStatus.CONFLICT
          : HttpStatus.BAD_REQUEST;

      return response.status(status).json(
        BaseResponse.error({
          statusCode: status,
          errorType: handledError.name,
          errors: handledError.errors,
          message: handledError.message,
        }),
      );
    }
  }
}
