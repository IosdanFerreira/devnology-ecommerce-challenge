import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './services/login/login.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponseDto } from 'src/shared/utils/dto/base-response.dto';
import { UserEntity } from './entities/user.entity';
import { SignInDto } from './services/login/dto/signin.dto';
import { Response } from 'express';
import { isPublic } from 'src/shared/decorator/is-public.decorator';
import { ErrorResponseDto } from 'src/shared/errors/dto/errors-response.dto';
import { SignUpDto } from './services/signup/dto/signup.dto';
import { SignupService } from './services/signup/signup.service';
import { UserResponseDto } from './dto/user-response.dto';
import { RefreshJwtAuthGuard } from 'src/shared/auth/guards/refresh-jwt-auth.guard';
import { RefreshTokenService } from './services/refresh-token/refresh-token.service';
import { LogoutService } from './services/logout/logout.service';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly signupService: SignupService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly logoutService: LogoutService,
  ) {}

  @isPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Rota que realiza o login do usuário',
  })
  @Header('Access-Control-Allow-Credentials', 'true')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({
    description:
      'Email ou senha inválidos/Erro na validação dos parâmetros enviados',
    type: ErrorResponseDto,
  })
  async login(
    @Body() signinDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.loginService.signin(signinDto, response);
  }

  @isPublic()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Rota que cadastra um novo usuário',
  })
  @ApiCreatedResponse({
    description: 'Usuário registrado com sucesso',
    type: BaseResponseDto<null>,
  })
  @ApiConflictResponse({
    description: 'Já existe um usuário com o email informado',
    type: ErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos para cadastro',
  })
  async signup(
    @Body() signUpDto: SignUpDto,
  ): Promise<BaseResponseDto<UserEntity>> {
    return await this.signupService.signup(signUpDto);
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Renovar token',
    description: 'Gera um novo token de acesso usando o refresh token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Novo token gerado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Acesso não autorizado se o refresh token for inválido',
  })
  @isPublic()
  @UseGuards(RefreshJwtAuthGuard)
  @Header('Access-Control-Allow-Credentials', 'true')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.refreshTokenService.refresh(req.user, res);
  }

  @Post('logout')
  @ApiOperation({
    summary: 'Realizar logout',
    description: 'Desconecta um usuário do sistema',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logout realizado com sucesso',
  })
  @isPublic()
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.logoutService.signout(res);
  }
}
