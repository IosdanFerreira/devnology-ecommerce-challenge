import { ApiProperty } from '@nestjs/swagger';
import { PaginationInterface } from 'src/shared/utils/interfaces/pagination.interface';

export class PaginationDto implements PaginationInterface {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty({ nullable: true })
  prevPage: number | null;

  @ApiProperty({ nullable: true })
  nextPage: number | null;
}
