import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { RegisterOrderInputDto } from './dto/register-order-input.dto';
import { BaseResponse } from 'src/shared/utils/base-response.utils';
import { NotFoundError } from 'src/shared/errors';

@Injectable()
export class RegisterOrderService {
  constructor(private readonly _prisma: PrismaService) {}

  async execute(input: RegisterOrderInputDto, userId: number) {
    const user = await this._prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const order = await this._prisma.order.create({
      data: {
        userId: userId,
        customer: input.customer,
        email: input.email,
        phone: input.phone,
        address: input.address,
        products: input.products,
        totalAmount: input.totalAmount,
        status: 'pending',
        paymentMethod: input.paymentMethod,
        paymentStatus: input.paymentStatus ?? 'pending',
        paymentId: input.paymentId,
        paymentDate: input.paymentDate
          ? new Date(input.paymentDate)
          : undefined,
      },
    });

    return BaseResponse.success({
      statusCode: 201,
      success: true,
      errorType: null,
      errors: null,
      message: 'Pedido registrado com sucesso',
      data: order,
      meta: null,
    });
  }
}
