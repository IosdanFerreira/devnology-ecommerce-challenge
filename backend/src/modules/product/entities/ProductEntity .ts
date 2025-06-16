import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  department: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  hasDiscount: boolean;

  @ApiProperty()
  discountValue: number;

  @ApiProperty({ type: [String] })
  gallery: string[];

  @ApiProperty()
  image: string;

  @ApiProperty()
  material: string;

  @ApiProperty()
  supplier?: string;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
