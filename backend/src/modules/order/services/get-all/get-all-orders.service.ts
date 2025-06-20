import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { NotFoundError } from 'src/shared/errors';
import { BaseResponse } from 'src/shared/utils/base-response.utils';
import { PrismaPagination } from 'src/shared/utils/generate-prisma-pagination';

@Injectable()
export class GetAllOrdersService {
  constructor(private readonly _prisma: PrismaService) {}

  async execute(userId: number, page: number = 1, perPage: number = 10) {
    const user = await this._prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const skip = (page - 1) * perPage;

    const [orders, totalCount] = await this._prisma.$transaction([
      this._prisma.order.findMany({
        where: { userId: Number(userId) },
        orderBy: { createdAt: 'desc' },
        skip,
        take: perPage,
      }),
      this._prisma.order.count({
        where: { userId: Number(userId) },
      }),
    ]);

    const pagination = PrismaPagination.generate(totalCount, page, perPage);

    return BaseResponse.success({
      statusCode: 200,
      success: true,
      errorType: null,
      errors: null,
      message: 'Pedidos obtidos com sucesso',
      data: orders,
      meta: {
        pagination,
        sort: 'createdAt',
        sortDir: 'desc',
        filter: null,
      },
    });
  }
}
