import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { RegisterOrderService } from './services/register/register-order.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { GetAllOrdersService } from './services/get-all/get-all-orders.service';

@Module({
  controllers: [OrderController],
  providers: [PrismaService, RegisterOrderService, GetAllOrdersService],
})
export class OrderModule {}
