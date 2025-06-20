import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { NotFoundError } from 'src/shared/errors';
import { BaseResponse } from 'src/shared/utils/base-response.utils';

@Injectable()
export class GetLoggedUserService {
  constructor(private readonly _prisma: PrismaService) {}
  async getMe(id: number) {
    const user = await this._prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        privacy_consent: true,
        address: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return BaseResponse.success({
      statusCode: 200,
      success: true,
      errorType: null,
      errors: null,
      message: 'Usuário encontrado com sucesso',
      data: user,
      meta: null,
    });
  }
}
