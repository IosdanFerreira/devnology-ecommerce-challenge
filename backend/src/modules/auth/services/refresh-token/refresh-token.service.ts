import { HttpStatus, Injectable } from '@nestjs/common';

import { UserEntity } from '../../entities/user.entity';
import { BaseResponse } from 'src/shared/utils/base-response.utils';
import { TokenService } from '../token/tokens.service';
import { Response } from 'express';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly tokenService: TokenService) {}

  /**
   * Registra um novo usuário com os dados fornecidos.
   * @param signUpDto Os dados para registrar o usuário.
   * @returns Uma promessa com a resposta formatada indicando sucesso.
   */
  async refresh(user: UserEntity, res: Response): Promise<BaseResponse<null>> {
    const tokens = this.tokenService.generateTokens(user);

    // Define the new access token cookie
    res.cookie('accessToken', tokens.auth_tokens.access_token.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    // Return a success response for the token refresh operation
    return BaseResponse.success({
      statusCode: HttpStatus.OK,
      success: true,
      errorType: null,
      errors: null,
      message: 'Token renovado com sucesso',
      data: null,
      meta: null,
    });
  }
}
