import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [ProductModule, OrderModule],
  providers: [PrismaService],
})
export class AppModule {}
