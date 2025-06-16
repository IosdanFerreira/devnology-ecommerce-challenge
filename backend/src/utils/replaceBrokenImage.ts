/**
 * Substitui uma URL de imagem quebrada por uma imagem aleatória do Picsum Photos.
 *
 * @param url - A URL da imagem a ser verificada.
 * @param fallbackSeed - Um número ou string para gerar variações (opcional).
 * @returns Uma nova URL de imagem válida.
 */
export function replaceBrokenImage(url: string): string {
  if (!url || url.includes('placeimg.com')) {
    const base = 'https://picsum.photos/640/480';

    return `${base}?random=${Math.floor(Math.random() * 10000)}`;
  }
  return url;
}
