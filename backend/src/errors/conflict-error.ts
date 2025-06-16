import { ErrorStructureDto } from './dto/errors-response.dto';

export class ConflictError extends Error {
  constructor(
    public message: string,
    public errors: ErrorStructureDto[] = [],
  ) {
    super(message);
    this.name = 'ConflictError';
  }
}
