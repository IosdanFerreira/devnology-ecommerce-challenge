import { HttpStatus, Inject, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SignInDto } from './dto/signin.dto';
import { UserEntity } from '../../entities/user.entity';
import { BadRequestError } from 'src/shared/errors';
import { HashProviderInterface } from 'src/shared/providers/interfaces/hash-provider.interface';
import { BaseResponseInterface } from 'src/shared/utils/interfaces/base-response.interface';
import { Response } from 'express';
import { TokenService } from '../token/tokens.service';
import { TokenCookieManager } from 'src/shared/utils/token-cookie-manager.utils';
import { BaseResponse } from 'src/shared/utils/base-response.utils';

@Injectable()
export class LoginService {
  constructor(
    private readonly _prisma: PrismaService,

    private readonly tokenService: TokenService,

    @Inject('HashProviderInterface')
    private readonly hashProvider: HashProviderInterface,
  ) {}

  /**
   * Realiza o login de um usuário com os dados fornecidos.
   * @param signinDto Os dados para fazer o login do usuário.
   * @param response O objeto de resposta para setar os cookies.
   * @returns Uma promessa com a resposta formatada indicando sucesso.
   */
  async signin(
    signinDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<BaseResponseInterface<UserEntity>> {
    // Verifica se um usuário com o mesmo email j  existe
    const userAlreadyExists: UserEntity = await this._prisma.user.findUnique({
      where: {
        email: signinDto.email,
      },
    });

    if (!userAlreadyExists) {
      throw new BadRequestError('Email ou senha inválidos');
    }

    const isValidPassword = await this.hashProvider.compareHash(
      signinDto.password,
      userAlreadyExists.password,
    );

    if (!isValidPassword) {
      throw new BadRequestError('Email ou senha inválidos');
    }

    // Remove a senha dos dados do usuário
    delete userAlreadyExists.password;
    delete userAlreadyExists.deleted;

    // // Cria uma nova instância da classe que gera os tokens
    const tokens = this.tokenService.generateTokens(userAlreadyExists);

    // // // Seta o cookie de acesso
    TokenCookieManager.setAuthCookies(response, tokens);

    // // // Retorna a resposta formatada
    return BaseResponse.success<UserEntity>({
      statusCode: HttpStatus.OK,
      success: true,
      errorType: null,
      errors: null,
      message: 'Usuário logado com sucesso',
      data: { ...userAlreadyExists },
      meta: null,
    });
  }
}
