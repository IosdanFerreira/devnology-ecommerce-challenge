import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import refreshJwtConfig from 'src/shared/auth/config/jwt-refresh.config';
import { UserPayloadInterface } from './interfaces/user-payload.interface';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<
      typeof refreshJwtConfig
    >,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: refreshJwtConfiguration.secret,
    });
  }

  async validate(payload: UserPayloadInterface): Promise<any> {
    return {
      id: payload.sub,
    };
  }
}
