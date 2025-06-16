import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';

export class MetaDto {
  @ApiProperty()
  pagination: PaginationDto;

  @ApiProperty({ nullable: true })
  sort?: string | null;

  @ApiProperty({ nullable: true })
  sortDir?: 'asc' | 'desc' | null;

  @ApiProperty({ nullable: true })
  filter?: string | null;
}
