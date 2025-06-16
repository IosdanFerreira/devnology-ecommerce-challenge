import { ErrorStructureDto } from './dto/errors-response.dto';

export class BadRequestError extends Error {
  constructor(
    public message: string,
    public errors: ErrorStructureDto[] = [],
  ) {
    super(message);
    this.name = 'BadRequestError';
  }
}
