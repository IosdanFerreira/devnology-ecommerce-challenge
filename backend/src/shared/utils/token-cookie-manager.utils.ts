import { Response } from 'express';
import { TokensOutputInterface } from './interfaces/token-output.interface';

export class TokenCookieManager {
  /**
   * Define as cookies de autentica o para o usuário.
   * @param response - Resposta do Express
   * @param tokens - Tokens de autenticação gerados
   */
  static setAuthCookies(
    response: Response,
    tokens: TokensOutputInterface,
  ): void {
    // Cookie do access token
    response.cookie('accessToken', tokens.auth_tokens.access_token.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    // Cookie do refresh token
    response.cookie('refreshToken', tokens.auth_tokens.refresh_token.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      path: '/auth/refresh',
    });
  }

  /**
   * Remove as cookies de autenticação
   * @param response - Resposta do Express
   */
  static clearAuthCookies(response: Response): void {
    // Remove a cookie de access token
    response.clearCookie('accessToken', { path: '/' });

    // Remove a cookie de refresh token
    response.clearCookie('refreshToken', { path: '/auth/refresh' });
  }
}
