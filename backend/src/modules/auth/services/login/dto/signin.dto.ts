import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'Email do usuário',
  })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({ example: 'Abcd12!@', description: 'Senha do usuário' })
  @IsNotEmpty({ message: 'Senha é obrigatório' })
  @IsString({ message: 'Senha deve ser do tipo string' })
  password: string;
}
