import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../entities/ProductEntity ';

export class OrderedProductDto extends ProductEntity {
  @ApiProperty({ example: 2 })
  quantity: number;

  constructor(partial: Partial<OrderedProductDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
