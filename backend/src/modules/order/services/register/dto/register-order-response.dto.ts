import { ApiProperty } from '@nestjs/swagger';
import { OrderedProductDto } from 'src/modules/product/dto/ordered-product.dto';

export class RegisterOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: 'null', example: null, nullable: true })
  errorType: null;

  @ApiProperty({ type: 'null', example: null, nullable: true })
  errors: null;

  @ApiProperty()
  message: string;

  @ApiProperty({
    type: () => OrderedProductDto,
  })
  data: OrderedProductDto[];

  @ApiProperty({ type: 'null', example: null, nullable: true })
  meta: null;
}
