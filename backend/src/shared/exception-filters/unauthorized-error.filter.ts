import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { UnauthorizedError } from 'src/shared/errors';
import { BaseResponse } from 'src/shared/utils/base-response.utils';

@Catch(UnauthorizedError)
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNAUTHORIZED).send(
      BaseResponse.error({
        statusCode: HttpStatus.UNAUTHORIZED,
        success: false,
        errorType: exception.name,
        errors: exception.errors,
        message: exception.message,
        data: null,
        meta: null,
      }),
    );
  }
}
