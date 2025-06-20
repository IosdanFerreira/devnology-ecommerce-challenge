import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { MetaInterface } from '../interfaces/meta.interface';

export class MetaDto implements MetaInterface {
  @ApiProperty()
  pagination: PaginationDto;

  @ApiProperty({ nullable: true })
  sort: string;

  @ApiProperty()
  sortDir: 'asc' | 'desc';

  @ApiProperty({ nullable: true })
  filter?: string | null;
}
