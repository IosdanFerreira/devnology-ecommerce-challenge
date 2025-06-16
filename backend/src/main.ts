import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { BadRequestError } from './errors';
import { flattenValidationErrors } from './utils/flattenValidationErrors';
import { PrismaExceptionFilter } from './exception-filters/prisma-error.filter';
import { BadRequestErrorFilter } from './exception-filters/bad-request-error.filter';
import { ConflictErrorFilter } from './exception-filters/conflict-error.filter';
import { NotFoundErrorFilter } from './exception-filters/not-found-error.filter';
import { UnauthorizedErrorFilter } from './exception-filters/unauthorized-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Documentação da API do Devnology Ecommerce Challenge')
    .setDescription('Essa API foi construída usando NestJS na versão 10.0')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const result = flattenValidationErrors(errors);
        return new BadRequestError(
          'Erro na validação dos parâmetros enviados',
          result,
        );
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new BadRequestErrorFilter(),
    new ConflictErrorFilter(),
    new NotFoundErrorFilter(),
    new UnauthorizedErrorFilter(),
  );

  await app.listen(3000);
}
bootstrap();
