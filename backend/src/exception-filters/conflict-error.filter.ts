import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { ConflictError } from 'src/errors';
import { BaseResponse } from 'src/utils/baseResponse.utils';

@Catch(ConflictError)
export class ConflictErrorFilter implements ExceptionFilter {
  catch(exception: ConflictError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).send(
      BaseResponse.error({
        statusCode: HttpStatus.CONFLICT,
        errorType: exception.name,
        errors: exception.errors,
        message: exception.message,
      }),
    );
  }
}
