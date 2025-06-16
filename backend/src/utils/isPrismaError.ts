import { Prisma } from '@prisma/client';

/**
 * Verifica se o erro passado é um erro conhecido do Prisma.
 *
 * @param {any} e - O erro a ser verificado.
 * @returns {e is Prisma.PrismaClientKnownRequestError} - Se o erro for um erro conhecido do Prisma ou não.
 */
export const isPrismaError = (
  e: any,
): e is Prisma.PrismaClientKnownRequestError => {
  return e instanceof Prisma.PrismaClientKnownRequestError;
};
