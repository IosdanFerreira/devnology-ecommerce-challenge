import { Module } from '@nestjs/common';
import { GetAllProductsController } from './get-all/get-all-products.controller';
import { GetAllProductsService } from './get-all/get-all-products.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GetAllProductsController],
  providers: [PrismaService, GetAllProductsService],
})
export class ProductModule {}
