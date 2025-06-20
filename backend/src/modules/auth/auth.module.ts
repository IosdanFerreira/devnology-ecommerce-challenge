import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginService } from './services/login/login.service';
import { HashProvider } from 'src/shared/providers/hash-provider';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from './services/token/tokens.service';
import { SignupService } from './services/signup/signup.service';
import jwtRefreshConfig from 'src/shared/auth/config/jwt-refresh.config';
import jwtConfig from 'src/shared/auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/shared/auth/strategies/jwt.strategy';
import { RefreshJwtStrategy } from 'src/shared/auth/strategies/jwt-refresh.strategy';
import { RefreshTokenService } from './services/refresh-token/refresh-token.service';
import { LogoutService } from './services/logout/logout.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(jwtRefreshConfig),
    ConfigModule.forRoot(),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    LoginService,
    SignupService,
    TokenService,
    RefreshTokenService,
    LogoutService,
    JwtStrategy,
    RefreshJwtStrategy,
    {
      provide: 'HashProviderInterface',
      useClass: HashProvider,
    },
  ],
})
export class AuthModule {}
