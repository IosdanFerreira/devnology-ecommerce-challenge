import { Module } from '@nestjs/common';
import { RegisterOrderController } from './register/register-order.controller';
import { RegisterOrderService } from './register/register-order.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RegisterOrderController],
  providers: [PrismaService, RegisterOrderService],
})
export class OrderModule {}
