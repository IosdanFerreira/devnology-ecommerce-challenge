import { Module } from '@nestjs/common';
import { GetAllProductsService } from './get-all/get-all-products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [PrismaService, GetAllProductsService],
})
export class ProductModule {}
