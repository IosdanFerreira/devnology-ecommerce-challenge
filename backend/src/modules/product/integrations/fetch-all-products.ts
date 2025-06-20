import axios from 'axios';
import { normalizeProduct } from '../../../shared/utils/normalize-product.utils';
import { replaceBrokenImage } from '../../../shared/utils/replace-broken-image.utils';

/**
 * Busca produtos em uma API externa e os normaliza para o padrão da aplicação.
 *
 * @param url - URL da API a ser buscada.
 * @param origin - Origem dos produtos, que pode ser "brazilian" ou "european".
 * @returns Uma lista de produtos normalizados.
 */
export async function fetchAllProducts(
  url: string,
  origin: 'brazilian' | 'european',
) {
  const response = await axios.get(url);

  return response.data.map((product) => {
    const normalized = normalizeProduct(product, origin);
    normalized.image = replaceBrokenImage(normalized.image);
    normalized.gallery = (normalized.gallery || []).map((img) =>
      replaceBrokenImage(img),
    );

    return normalized;
  });
}
