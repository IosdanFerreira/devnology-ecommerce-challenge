import { ValidationError } from '@nestjs/common';

/**
 * Função que recebe um array de ValidationError e retorna um novo array com os erros sempre formatados com propriedade e mensagem.
 *
 * Caso o erro possua constraints, cada constraint será transformada em um objeto com propriedade e mensagem e adicionado ao novo array.
 *
 * Caso o erro possua filhos (children), esses filhos serão processados recursivamente e seus erros serão adicionados ao novo array com a propriedade
 * formatada como "pai.propriedade_do_filho".
 *
 * @param errors Um array de ValidationError.
 * @returns Um array de objetos com propriedade e mensagem.
 */
export function flattenValidationErrors(
  errors: ValidationError[],
): { property: string; message: string }[] {
  const result = [];

  for (const error of errors) {
    if (error.constraints) {
      for (const key of Object.keys(error.constraints)) {
        result.push({
          property: error.property,
          message: error.constraints[key],
        });
      }
    }

    if (error.children && error.children.length > 0) {
      const childrenErrors = flattenValidationErrors(error.children).map(
        (childError) => ({
          property: `${error.property}.${childError.property}`,
          message: childError.message,
        }),
      );
      result.push(...childrenErrors);
    }
  }

  return result;
}
