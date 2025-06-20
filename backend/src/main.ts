import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { BadRequestError } from './shared/errors';
import { flattenValidationErrors } from './shared/errors/utils/flatten-validation-errors.utils';
import { PrismaExceptionFilter } from './shared/exception-filters/prisma-error.filter';
import { BadRequestErrorFilter } from './shared/exception-filters/bad-request-error.filter';
import { ConflictErrorFilter } from './shared/exception-filters/conflict-error.filter';
import { NotFoundErrorFilter } from './shared/exception-filters/not-found-error.filter';
import { UnauthorizedErrorFilter } from './shared/exception-filters/unauthorized-error.filter';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Documentação da API do Devnology Ecommerce Challenge')
    .setDescription('Essa API foi construída usando NestJS na versão 10.0')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new BadRequestErrorFilter(),
    new ConflictErrorFilter(),
    new NotFoundErrorFilter(),
    new UnauthorizedErrorFilter(),
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(cookieParser());

  app.use(helmet());

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

  await app.listen(3000);
}
bootstrap();
