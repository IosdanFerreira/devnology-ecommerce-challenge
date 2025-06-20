import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity ';

export class OrderedProductDto extends ProductEntity {
  @ApiProperty({ example: 2 })
  quantity: number;
}
