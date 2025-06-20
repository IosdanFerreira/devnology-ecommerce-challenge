import { ApiProperty } from '@nestjs/swagger';
import { ErrorStructureDto } from 'src/shared/errors/dto/errors-response.dto';
import { MetaDto } from './meta.dto';
import { BaseResponseInterface } from '../interfaces/base-response.interface';

export class BaseResponseDto<T> implements BaseResponseInterface<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  success: boolean;

  @ApiProperty({ required: false, nullable: true })
  errorType?: string | null;

  @ApiProperty({
    type: () => [ErrorStructureDto],
    isArray: true,
    required: false,
    nullable: true,
  })
  errors?: ErrorStructureDto[] | null;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false, nullable: true })
  data?: T | null;

  @ApiProperty({ required: false, nullable: true })
  meta?: MetaDto | null;
}
