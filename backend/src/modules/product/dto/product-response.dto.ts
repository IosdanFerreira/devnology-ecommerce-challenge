import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity ';
import { MetaDto } from 'src/shared/utils/dto/meta.dto';

export class ProductResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  success: boolean;

  @ApiProperty({ nullable: true })
  errorType: string | null;

  @ApiProperty({ type: [Object], nullable: true })
  errors: Array<{ property?: string; message: string }> | null;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: [ProductEntity], nullable: true })
  data: ProductEntity[];

  @ApiProperty()
  meta: MetaDto;
}
