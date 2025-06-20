/**
 * Converte um valor em reais para centavos.
 *
 * @example
 * convertToCents(10.99) // 1099
 *
 * @param {number} value - O valor em reais a ser convertido.
 *
 * @returns {number} O valor convertido em centavos.
 */
export function convertToCents(value: number): number {
  return value * 100;
}
