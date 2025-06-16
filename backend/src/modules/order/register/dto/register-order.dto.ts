import { PaymentMethod, Status } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsArray,
  IsDateString,
  Matches,
} from 'class-validator';

export class RegisterOrderDto {
  @IsString({ message: 'customer deve ser uma string' })
  @IsNotEmpty({ message: 'O nome do cliente deve ser informado' })
  customer: string;

  @IsEmail({}, { message: 'email deve ser um email valido' })
  email: string;

  @IsString({ message: 'phone deve ser uma string' })
  @IsNotEmpty({ message: 'O número de telefone do cliente deve ser informado' })
  @Matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, {
    message: 'O telefone deve estar no formato (XX) XXXXX-XXXX',
  })
  phone: string;

  @IsString({ message: 'address deve ser uma string' })
  @IsNotEmpty({ message: 'O endereço do cliente deve ser informado' })
  address: string;

  @IsArray({ message: 'products deve ser um array' })
  @IsNotEmpty({
    message: 'Pelo menos um produto deve ser adicionado ao pedido',
  })
  products: any[];

  @IsNumber({}, { message: 'totalAmount deve ser um number' })
  @IsNotEmpty({
    message: 'O valor total do pedido deve ser informado',
  })
  totalAmount: number;

  @IsEnum(Status, { message: 'O status do pedido deve ser do tipo Status' })
  @IsOptional()
  status?: Status;

  @IsEnum(PaymentMethod, {
    message: 'O método de pagamento deve ser do tipo PaymentMethod',
  })
  paymentMethod: PaymentMethod;

  @IsEnum(Status, { message: 'O status do pedido deve ser do tipo Status' })
  @IsOptional()
  paymentStatus?: Status; // default pending

  @IsString({ message: 'paymentId deve ser uma string' })
  @IsOptional()
  paymentId?: string;

  @IsDateString({}, { message: 'paymentDate deve ser uma data' })
  @IsOptional()
  paymentDate?: string;
}
