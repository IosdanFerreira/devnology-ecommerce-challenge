import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { RegisterOrderService } from './register/register-order.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OrderController],
  providers: [PrismaService, RegisterOrderService],
})
export class OrderModule {}
