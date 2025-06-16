import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { NotFoundError } from 'src/errors';
import { BaseResponse } from 'src/utils/baseResponse.utils';

@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).send(
      BaseResponse.error({
        statusCode: HttpStatus.NOT_FOUND,
        errorType: exception.name,
        errors: exception.errors,
        message: exception.message,
      }),
    );
  }
}
