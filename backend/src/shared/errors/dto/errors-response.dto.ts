import { ApiProperty } from '@nestjs/swagger';
import { ErrorStructureInterface } from '../interfaces/error-structure.interface';

export class ErrorStructureDto {
  @ApiProperty()
  property?: string;

  @ApiProperty()
  message?: string;
}

export class ErrorResponseDto implements ErrorStructureInterface {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty()
  errorType: string;

  @ApiProperty({
    required: false,
    nullable: true,
    type: [ErrorStructureDto],
  })
  erros?: ErrorStructureDto[] | null;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: 'null', nullable: true, default: null })
  data: null;

  @ApiProperty({ type: 'null', nullable: true, default: null })
  meta: null;
}
