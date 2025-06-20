import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { NotFoundError } from 'src/shared/errors';
import { BaseResponse } from 'src/shared/utils/base-response.utils';

@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).send(
      BaseResponse.error({
        statusCode: HttpStatus.NOT_FOUND,
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
