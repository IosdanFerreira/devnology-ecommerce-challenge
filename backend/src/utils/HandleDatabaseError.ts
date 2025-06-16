import { ConflictError } from 'src/errors';
import { DatabaseError } from 'src/errors/database-error';
import { PrismaClientError } from 'src/errors/prisma-client-error';

// Enum que deve armazenar todos os tipos de erro Prisma que serão observados na aplicação
enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

// Método que define qual exceção vai ser disparada dependendo do código do erro Prisma
export const handleDatabaseErrors = (e: PrismaClientError) => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new ConflictError('Já existe um usuário com os dados informados.');

    default:
      return new DatabaseError(e.message);
  }
};
