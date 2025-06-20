// services/product-filter.service.ts
import { Injectable } from '@nestjs/common';
import { GetAllProductsParamsDto } from 'src/modules/product/dto/get-all-products-params.dto';
import { ProductEntity } from 'src/modules/product/entities/product.entity ';
import { FilterProductsInterface } from './interfaces/filter-products.interface';

@Injectable()
export class FilterProducts implements FilterProductsInterface {
  /**
   * Filtra uma lista de produtos com base nos parâmetros fornecidos.
   *
   * @param products - Array de produtos a ser filtrado.
   * @param params - Parâmetros de filtro que podem conter texto, categorias, preços, etc.
   * @returns Uma lista de produtos que correspondem aos critérios do filtro.
   */
  filter(
    products: ProductEntity[],
    params: GetAllProductsParamsDto,
  ): ProductEntity[] {
    const {
      filter,
      hasDiscount,
      category,
      supplier,
      material,
      minPrice,
      maxPrice,
    } = params;

    // Converte o parâmetro hasDiscount para boolean, se for string
    const parsedHasDiscount =
      typeof hasDiscount === 'string'
        ? hasDiscount.toLowerCase() === 'true'
        : hasDiscount;

    // Converte os preços mínimos e máximos para número
    const min = this.parsePrice(minPrice);
    const max = this.parsePrice(maxPrice);

    // Aplica os filtros na lista de produtos
    return products.filter((product) => {
      // Verifica filtro de texto (nome, descrição, departamento ou categoria)
      if (filter && !this.matchesTextFilter(product, filter)) return false;

      // Verifica filtro de desconto
      if (
        typeof parsedHasDiscount === 'boolean' &&
        product.hasDiscount !== parsedHasDiscount
      )
        return false;

      // Verifica filtro de categoria (case insensitive)
      if (
        category &&
        product.category?.toLowerCase() !== category.toLowerCase()
      )
        return false;

      // Verifica filtro de fornecedor (case insensitive)
      if (
        supplier &&
        product.supplier?.toLowerCase() !== supplier.toLowerCase()
      )
        return false;

      // Verifica filtro de material (case insensitive)
      if (
        material &&
        product.material?.toLowerCase() !== material.toLowerCase()
      )
        return false;

      // Calcula preço final considerando desconto, se houver
      const price = product.hasDiscount
        ? product.price - (product.discountValue || 0)
        : product.price;

      // Filtra produtos com preço abaixo do mínimo
      if (min !== undefined && price < min) return false;

      // Filtra produtos com preço acima do máximo
      if (max !== undefined && price > max) return false;

      // Produto passou por todos os filtros
      return true;
    });
  }

  /**
   * Verifica se o produto corresponde ao filtro de texto,
   * buscando nas propriedades name, description, department e category.
   *
   * @param product - Produto a ser verificado.
   * @param filter - Texto de filtro.
   * @returns true se o texto for encontrado em alguma propriedade, false caso contrário.
   */
  private matchesTextFilter(product: ProductEntity, filter: string): boolean {
    const f = filter.toLowerCase();
    return (
      (product.name?.toLowerCase().includes(f) ?? false) ||
      (product.description?.toLowerCase().includes(f) ?? false) ||
      (product.department?.toLowerCase().includes(f) ?? false) ||
      (product.category?.toLowerCase().includes(f) ?? false)
    );
  }

  /**
   * Converte um valor de preço que pode ser string ou número para número,
   * retornando undefined se não for possível converter.
   *
   * @param price - Valor do preço como string ou número.
   * @returns Número convertido ou undefined se inválido.
   */
  private parsePrice(price?: number | string): number | undefined {
    if (price === undefined) return undefined;
    const p = typeof price === 'number' ? price : Number(price);
    return isNaN(p) ? undefined : p;
  }
}
