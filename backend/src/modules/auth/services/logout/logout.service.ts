import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from 'src/shared/utils/base-response.utils';
import { TokenCookieManager } from 'src/shared/utils/token-cookie-manager.utils';

@Injectable()
export class LogoutService {
  async signout(@Res({ passthrough: true }) res: Response) {
    TokenCookieManager.clearAuthCookies(res);

    return BaseResponse.success({
      statusCode: HttpStatus.OK,
      success: true,
      errorType: null,
      errors: null,
      message: 'Logout efetuado com sucesso',
      data: null,
      meta: null,
    });
  }
}
