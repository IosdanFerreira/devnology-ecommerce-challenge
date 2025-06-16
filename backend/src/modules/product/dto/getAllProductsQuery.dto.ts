import { IsOptional, IsNumber, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllProductsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  perPage?: number;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortDir?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  filter?: string;
}
