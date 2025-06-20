import { ApiProperty } from '@nestjs/swagger';
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
import { OrderedProductDto } from 'src/modules/product/dto/ordered-product.dto';

export class RegisterOrderInputDto {
  @ApiProperty()
  @IsString({ message: 'customer deve ser uma string' })
  @IsNotEmpty({ message: 'O nome do cliente deve ser informado' })
  customer: string;

  @ApiProperty()
  @IsEmail({}, { message: 'email deve ser um email valido' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'phone deve ser uma string' })
  @IsNotEmpty({ message: 'O número de telefone do cliente deve ser informado' })
  @Matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, {
    message: 'O telefone deve estar no formato (XX) XXXXX-XXXX',
  })
  phone: string;

  @ApiProperty()
  @IsString({ message: 'address deve ser uma string' })
  @IsNotEmpty({ message: 'O endereço do cliente deve ser informado' })
  address: string;

  @ApiProperty({ type: [OrderedProductDto] })
  @IsArray({ message: 'products deve ser um array' })
  @IsNotEmpty({
    message: 'Pelo menos um produto deve ser adicionado ao pedido',
  })
  products: any[];

  @ApiProperty()
  @IsNumber({}, { message: 'totalAmount deve ser um number' })
  @IsNotEmpty({
    message: 'O valor total do pedido deve ser informado',
  })
  totalAmount: number;

  @IsEnum(PaymentMethod, {
    message: 'O método de pagamento deve ser do tipo PaymentMethod',
  })
  paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsEnum(Status, { message: 'O status do pedido deve ser do tipo Status' })
  @IsOptional()
  paymentStatus?: Status;

  @ApiProperty()
  @IsString({ message: 'paymentId deve ser uma string' })
  @IsOptional()
  paymentId?: string;

  @ApiProperty()
  @IsDateString({}, { message: 'paymentDate deve ser uma data' })
  @IsOptional()
  paymentDate?: string;
}
