import { ApiProperty } from '@nestjs/swagger';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'name deve ser do tipo string' })
  @Matches(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ']+( [A-Za-zÀ-ÿ']+)*$/, {
    message: 'Nome deve conter pelo menos 3 caracteres',
  })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Senha é obrigatório' })
  @IsString({ message: 'password deve ser do tipo string' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'A senha deve conter ao menos 8 caracteres, uma letra maiúscula, um número e um carácter especial',
  })
  password: string;

  @ApiProperty({
    example: '(xx) xxxxx-xxxx',
  })
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString({ message: 'phone deve ser do tipo string' })
  @Matches(/^\(\d{2}\) \d{5}-\d{4}$/, { message: 'Telefone inválido' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Aceitar os termos de privacidade é obrigatório' })
  @IsBoolean({ message: 'phone privacy_consent ser do tipo boolean' })
  @Equals(true, { message: 'Aceitar os termos de privacidade é obrigatório' })
  privacy_consent: boolean;
}
