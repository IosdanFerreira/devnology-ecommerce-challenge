import { Injectable } from '@nestjs/common';
import { suppliers } from 'src/constants/suppliersUrl';
import { SortDirection } from 'src/interfaces/meta.interface';
import { BaseResponse } from 'src/utils/baseResponse.utils';
import { fetchAllProducts } from 'src/modules/product/integrations/fetchAllProducts';
import { GeneratePagination } from 'src/utils/generatePagination.utils';

@Injectable()
export class GetAllProductsService {
  /**
   * Retorna uma lista de produtos paginada, com opção de ordenar e filtrar.
   *
   * @param page - Número da página a ser retornada.
   * @param perPage - Número de produtos por página.
   * @param sort - Nome do campo que será usado para ordenar os dados
   * @param sortDir - Direção da ordenação
   * @param filter - Filtro para busca por nome, descrição, departamento e categoria
   * @param hasDiscount - Filtro para produtos com desconto
   *
   * @returns Um objeto com as informações de paginação e dados paginados.
   */
  async execute(
    page = 1,
    perPage = 30,
    sort = null,
    sortDir: SortDirection = 'asc',
    filter?: string,
    hasDiscount?: string | boolean,
  ) {
    // Busca produtos de fornecedores brasileiros e europeus
    const [brazilianProducts, europeanProducts] = await Promise.all([
      fetchAllProducts(suppliers.brazilianSupplierUrl, 'brazilian'),
      fetchAllProducts(suppliers.europeanSupplierUrl, 'european'),
    ]);

    // Combina todos os produtos em uma única lista
    const allProducts = [...brazilianProducts, ...europeanProducts];

    // Converte o filtro de desconto para booleano, se necessário
    const parsedHasDiscount =
      typeof hasDiscount === 'string' ? hasDiscount === 'true' : hasDiscount;

    // Filtra produtos com base no texto e no desconto
    const filteredProducts = allProducts.filter((product) => {
      const matchesTextFilter = filter
        ? (product.name &&
            product.name.toLowerCase().includes(filter.toLowerCase())) ||
          (product.description &&
            product.description.toLowerCase().includes(filter.toLowerCase())) ||
          (product.department &&
            product.department.toLowerCase().includes(filter.toLowerCase())) ||
          (product.category &&
            product.category.toLowerCase().includes(filter.toLowerCase()))
        : true;

      const matchesDiscountFilter =
        typeof parsedHasDiscount === 'boolean'
          ? product.hasDiscount === parsedHasDiscount
          : true;

      return matchesTextFilter && matchesDiscountFilter;
    });

    // Pagina os produtos filtrados
    const paginatedProducts = GeneratePagination(
      filteredProducts,
      page,
      perPage,
      sort,
      sortDir,
    );

    // Retorna a resposta com os produtos paginados e metadados
    return BaseResponse.success<any>({
      statusCode: 200,
      message: 'Produtos encontrados com sucesso',
      data: paginatedProducts.data,
      meta: {
        pagination: {
          totalItems: paginatedProducts.pagination.totalItems,
          currentPage: paginatedProducts.pagination.currentPage,
          perPage: paginatedProducts.pagination.perPage,
          totalPages: paginatedProducts.pagination.totalPages,
          prevPage: paginatedProducts.pagination.prevPage,
          nextPage: paginatedProducts.pagination.nextPage,
        },
        sort,
        sortDir,
        filter: filter || null,
      },
    });
  }
}
