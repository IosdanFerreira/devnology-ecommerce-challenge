import { Module } from '@nestjs/common';
import { GetAllProductsService } from './services/get-all/get-all-products.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ProductsController } from './products.controller';
import { GetProductByIdService } from './services/get-by-id/get-product-by-id.service';
import { FilterProducts } from './services/get-all/utils/filter-products.utils';

@Module({
  controllers: [ProductsController],
  providers: [
    PrismaService,
    GetAllProductsService,
    GetProductByIdService,
    { provide: 'FilterProductsInterface', useClass: FilterProducts },
  ],
})
export class ProductModule {}
