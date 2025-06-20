import { ApiProperty } from '@nestjs/swagger';
import { ErrorStructureDto } from 'src/shared/errors/dto/errors-response.dto';
import { MetaDto } from './dto/meta.dto';

export class BaseResponse<T> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: null, nullable: true })
  errorType: string | null;

  @ApiProperty({
    example: null,
    nullable: true,
    type: [ErrorStructureDto],
  })
  errors: ErrorStructureDto[] | null;

  @ApiProperty({ example: 'Operação realizada com sucesso' })
  message: string;

  @ApiProperty({ nullable: true })
  data: T | null;

  @ApiProperty({ nullable: true })
  meta: MetaDto | null;

  constructor(partial: Partial<BaseResponse<T>>) {
    Object.assign(this, partial);
  }

  /**
   * Método estático para criar uma resposta de sucesso padrão em toda aplicação.
   * @param statusCode - Código de status HTTP - Ex: 200.
   * @param data - Dados a serem retornados na resposta.
   * @param message - Mensagem geral de sucesso.
   * @param meta - Dados de paginação, ordenação ou qualquer metadado adicional.
   * @returns Uma instância de BaseResponse representando uma resposta de sucesso.
   */
  static success<T>({
    statusCode = 200,
    message,
    data,
    meta,
  }: BaseResponse<T>): BaseResponse<T> {
    return new BaseResponse({
      statusCode,
      success: true,
      errorType: null,
      errors: null,
      message,
      data,
      meta: meta || null,
    });
  }

  /**
   * Método estático para criar uma resposta de erro padrão em toda aplicação.
   * @param statusCode - Código de status HTTP - Ex: 400.
   * @param errorType - Tipo de erro ocorrido - Ex: 'BadRequestError'.
   * @param errors - Lista de erros detalhados, cada um com propriedade e mensagem.
   * @param message - Mensagem geral do erro.
   * @returns Uma instância de BaseResponse representando uma resposta de erro.
   */
  static error({
    statusCode,
    errorType,
    errors,
    message,
  }: BaseResponse<null>): BaseResponse<null> {
    return new BaseResponse({
      statusCode,
      success: false,
      errorType: errorType,
      errors,
      message,
      data: null,
      meta: null,
    });
  }
}
