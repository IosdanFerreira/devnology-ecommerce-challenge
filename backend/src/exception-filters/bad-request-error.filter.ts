import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { BadRequestError } from 'src/errors';
import { BaseResponse } from 'src/utils/baseResponse.utils';

@Catch(BadRequestError)
export class BadRequestErrorFilter implements ExceptionFilter {
  catch(exception: BadRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).send(
      BaseResponse.error({
        statusCode: HttpStatus.BAD_REQUEST,
        errorType: exception.name,
        errors: exception.errors,
        message: exception.message,
      }),
    );
  }
}
