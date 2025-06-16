import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
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
