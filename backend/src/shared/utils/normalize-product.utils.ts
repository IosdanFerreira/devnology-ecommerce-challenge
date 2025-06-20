import { ProductEntity } from 'src/modules/product/entities/product.entity ';
import { convertToCents } from './convert-to-cents.utils';

/**
 * Normaliza um objeto de produto fornecido, para que todas as propriedades necessárias estejam presentes e preenchidas com valores padrão, se necessário.

 * @param product - O objeto de produto a ser normalizado, que pode ter propriedades diferentes dependendo da origem dos dados.
 * @returns Um objeto de produto normalizado com propriedades padronizadas
 */
export function normalizeProduct(
  product: any,
  supplier: string,
): ProductEntity {
  return {
    id: `${supplier}-${product.id}`,
    name: product.name || product.nome || '',
    description: product.description || product.descricao || '',
    price: convertToCents(product.price) || convertToCents(product.preco) || 0,
    image: product.image || product.imagem || (product.gallery?.[0] ?? ''),
    material: product.material || product.details?.material || '',
    category: product.categoria || product.details?.adjective || '',
    supplier,
    department: product.departamento || '',
    gallery: product.gallery || [],
    hasDiscount: product.hasDiscount ?? false,
    discountValue: convertToCents(product.discountValue) || 0,
  };
}
