import { Injectable } from '@nestjs/common';
import { suppliers } from 'src/constants/suppliersUrl';
import { SortDirection } from 'src/interfaces/meta.interface';
import { BaseResponse } from 'src/utils/baseResponse.utils';
import { fetchProducts } from 'src/utils/fetchProducts';
import { GeneratePagination } from 'src/utils/generatePagination.utils';

@Injectable()
export class GetAllProductsService {
  /**
   * Retorna uma lista de produtos paginada, com op o de ordenar e filtrar.
   *
   * @param page - Número da página a ser retornada.
   * @param perPage - Número de produtos por página.
   * @param sort - Nome do campo que será usado para ordenar os dados
   * @param sortDir - Direção da ordenação
   * @param filter - Filtro para busca por nome, descrição, departamento e categoria
   *
   * @returns Um objeto com as informações de paginação e dados paginados.
   */
  async execute(
    page = 1,
    perPage = 30,
    sort = null,
    sortDir: SortDirection = 'asc',
    filter?: string,
  ) {
    // Busca os produtos de ambos os fornecedores
    const [brazilianProducts, europeanProducts] = await Promise.all([
      fetchProducts(suppliers.brazilianSupplierUrl, 'brazilian'),
      fetchProducts(suppliers.europeanSupplierUrl, 'european'),
    ]);

    // Combina os produtos
    const allProducts = [...brazilianProducts, ...europeanProducts];

    // Filtra os produtos, caso tenha um filtro
    const filteredProducts = filter
      ? allProducts.filter((product) => {
          const lowerFilter = filter.toLowerCase();

          return (
            (product.name &&
              product.name.toLowerCase().includes(lowerFilter)) ||
            (product.description &&
              product.description.toLowerCase().includes(lowerFilter)) ||
            (product.department &&
              product.department.toLowerCase().includes(lowerFilter)) ||
            (product.category &&
              product.category.toLowerCase().includes(lowerFilter))
          );
        })
      : allProducts;

    // Gera a paginação, ordenação, e retorna os produtos paginados
    const paginatedProducts = GeneratePagination(
      filteredProducts,
      page,
      perPage,
      sort,
      sortDir,
    );

    // Retorna a resposta padronizada
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
