import axios from 'axios';
import { normalizeProduct } from '../../../utils/normalizeProduct.utils';
import { replaceBrokenImage } from '../../../utils/replaceBrokenImage';
import { ProductEntity } from '../entities/ProductEntity ';

/**
 * Busca um produto por ID na API especificada.
 *
 * @param url - URL da API a ser buscada.
 * @param id - ID do produto a ser buscado.
 * @param origin - Origem do produto, que pode ser "brazilian" ou "european".
 *
 * @returns O produto encontrado, ou `null` se o produto n o for encontrado.
 */
export async function fetchProductById(
  url: string,
  id: string | number,
  origin: 'brazilian' | 'european',
): Promise<ProductEntity | null> {
  try {
    // Busca o produto na API
    const response = await axios.get(`${url}/${id}`);

    // Normaliza o produto encontrado
    const normalizedProduct = normalizeProduct(response.data, origin);

    // Substitui imagens quebradas por um link padr o
    normalizedProduct.image = replaceBrokenImage(normalizedProduct.image);
    normalizedProduct.gallery = (normalizedProduct.gallery || []).map((img) =>
      replaceBrokenImage(img),
    );

    return normalizedProduct;
  } catch (error) {
    // Se a API retornar um erro, retorna null
    if (axios.isAxiosError(error)) {
      if (error.response?.status !== 200) {
        return null;
      }
    }
  }
}
