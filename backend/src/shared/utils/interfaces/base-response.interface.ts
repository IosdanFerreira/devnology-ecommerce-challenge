import { ErrorStructureInterface } from '../../errors/interfaces/error-structure.interface';
import { MetaInterface } from './meta.interface';

export interface BaseResponseInterface<T> {
  statusCode: number;
  errors?: ErrorStructureInterface[] | null;
  errorType?: string | null;
  success: boolean;
  message: string;
  data?: T | null;
  meta?: MetaInterface | null;
}
