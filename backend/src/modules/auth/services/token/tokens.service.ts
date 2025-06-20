import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../entities/user.entity';
import { TokensOutputInterface } from 'src/shared/utils/interfaces/token-output.interface';
import refreshJwtConfig from 'src/shared/auth/config/jwt-refresh.config';
import { UserPayloadInterface } from 'src/shared/auth/strategies/interfaces/user-payload.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(refreshJwtConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  generateTokens(user: UserEntity): TokensOutputInterface {
    const payload: UserPayloadInterface = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const access_token = this.jwtService.sign(payload);

    const refresh_token = this.jwtService.sign(
      payload,
      this.refreshTokenConfig,
    );

    return {
      auth_tokens: {
        access_token: {
          token: access_token,
          expires_in:
            new Date().getTime() +
            Number(process.env.JWT_EXPIRES_IN_SECONDS) * 1000,
        },
        refresh_token: {
          token: refresh_token,
          expires_in:
            new Date().getTime() +
            Number(process.env.REFRESH_JWT_EXPIRES_IN_SECONDS) * 1000,
        },
      },
    };
  }
}
