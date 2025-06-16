import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class ErrorStructureDto {
  @ApiProperty()
  property: string;

  @ApiProperty()
  message: string;
}

export class ErrorResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty()
  errorType: string;

  @ApiProperty({
    required: false,
    nullable: true,
    oneOf: [
      { type: 'array', items: { $ref: getSchemaPath(ErrorStructureDto) } },
      { type: 'null' },
    ],
  })
  erros?: ErrorStructureDto[] | null;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: 'null', nullable: true, default: null })
  data: null;

  @ApiProperty({ type: 'null', nullable: true, default: null })
  meta: null;
}
