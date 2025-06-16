import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { UnauthorizedError } from 'src/errors';
import { BaseResponse } from 'src/utils/baseResponse.utils';

@Catch(UnauthorizedError)
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNAUTHORIZED).send(
      BaseResponse.error({
        statusCode: HttpStatus.UNAUTHORIZED,
        errorType: exception.name,
        errors: exception.errors,
        message: exception.message,
      }),
    );
  }
}
