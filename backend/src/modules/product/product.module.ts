import { Module } from '@nestjs/common';
import { GetAllProductsService } from './services/get-all/get-all-products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsController } from './products.controller';
import { GetProductByIdService } from './services/get-by-id/get-product-by-id.service';

@Module({
  controllers: [ProductsController],
  providers: [PrismaService, GetAllProductsService, GetProductByIdService],
})
export class ProductModule {}
