import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { BaseResponseInterface } from 'src/shared/utils/interfaces/base-response.interface';
import { UserEntity } from '../../entities/user.entity';
import { ConflictError } from 'src/shared/errors';
import { HashProviderInterface } from 'src/shared/providers/interfaces/hash-provider.interface';
import { BaseResponse } from 'src/shared/utils/base-response.utils';

@Injectable()
export class SignupService {
  constructor(
    private readonly _prisma: PrismaService,

    @Inject('HashProviderInterface')
    private readonly hashProvider: HashProviderInterface,
  ) {}

  /**
   * Registra um novo usuário com os dados fornecidos.
   * @param signUpDto Os dados para registrar o usuário.
   * @returns Uma promessa com a resposta formatada indicando sucesso.
   */
  async signup(
    signUpDto: SignUpDto,
  ): Promise<BaseResponseInterface<UserEntity>> {
    // Verifica se já existe um usuário com o mesmo e-mail
    const userAlreadyExists = await this._prisma.user.findUnique({
      where: {
        email: signUpDto.email,
      },
    });

    if (userAlreadyExists) {
      // Se já existir um usuário com o mesmo e-mail, lança um erro de conflito
      throw new ConflictError('Erro ao cadastrar novo usuário', [
        {
          property: 'email',
          message: 'Já existe um usuário com esse endereço de email',
        },
      ]);
    }

    // Gera o hash da senha fornecida
    const hashedPassword = await this.hashProvider.generateHash(
      signUpDto.password,
    );

    // Cria o novo usuário
    await this._prisma.user.create({
      data: {
        ...signUpDto,
        password: hashedPassword,
      },
    });

    // Retorna a resposta formatada
    return BaseResponse.success<UserEntity>({
      statusCode: HttpStatus.CREATED,
      success: true,
      errorType: null,
      errors: null,
      message: 'Usuário criado com sucesso',
      data: null,
      meta: null,
    });
  }
}
