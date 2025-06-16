import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../entities/ProductEntity ';
import { MetaDto } from 'src/utils/dto/meta.dto';

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
