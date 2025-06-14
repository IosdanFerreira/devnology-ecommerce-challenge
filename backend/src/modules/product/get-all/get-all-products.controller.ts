import { Controller, Get } from '@nestjs/common';
import { GetAllProductsService } from './get-all-products.service';

@Controller('all-products')
export class GetAllProductsController {
  constructor(private readonly getAllProductsService: GetAllProductsService) {}

  @Get()
  async getAllProducts() {
    return await this.getAllProductsService.execute();
  }
}
