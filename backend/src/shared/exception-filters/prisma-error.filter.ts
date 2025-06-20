import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { ConflictError } from 'src/shared/errors';
import { BaseResponse } from 'src/shared/utils/base-response.utils';
import { handleDatabaseErrors } from 'src/shared/errors/utils/handle-database-errors.utils';
import { isPrismaError } from 'src/shared/errors/utils/is-prisma-error.utils';

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
          success: false,
          errorType: handledError.name,
          errors: handledError.errors,
          message: handledError.message,
          data: null,
          meta: null,
        }),
      );
    }
  }
}
