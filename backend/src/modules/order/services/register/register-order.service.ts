import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterOrderInputDto } from './dto/register-order-input.dto';
import { BaseResponse } from 'src/shared/utils/base-response.utils';

@Injectable()
export class RegisterOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: RegisterOrderInputDto) {
    const order = await this.prisma.order.create({
      data: {
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
