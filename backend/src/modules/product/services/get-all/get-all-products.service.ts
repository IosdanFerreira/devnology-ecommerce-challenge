import { Inject, Injectable } from '@nestjs/common';
import { suppliers } from 'src/shared/constants/suppliersUrl';
import { BaseResponse } from 'src/shared/utils/base-response.utils';
import { fetchAllProducts } from 'src/modules/product/integrations/fetch-all-products';
import { GeneratePagination } from 'src/shared/utils/generate-pagination.utils';
import { GetAllProductsParamsDto } from '../../dto/get-all-products-params.dto';
import { FilterProductsInterface } from './utils/interfaces/filter-products.interface';

@Injectable()
export class GetAllProductsService {
  constructor(
    @Inject('FilterProductsInterface')
    private readonly productFilter: FilterProductsInterface,
  ) {}
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
  async execute(params: GetAllProductsParamsDto) {
    const [brazilianProducts, europeanProducts] = await Promise.all([
      fetchAllProducts(suppliers.brazilianSupplierUrl, 'brazilian'),
      fetchAllProducts(suppliers.europeanSupplierUrl, 'european'),
    ]);

    const allProducts = [...brazilianProducts, ...europeanProducts];

    // Filtrar os produtos de acordo com os parâmetros fornecidos
    const filteredProducts = this.productFilter.filter(allProducts, params);

    // Gera a paginação
    const paginatedProducts = GeneratePagination(
      filteredProducts,
      params.page ?? 1,
      params.perPage ?? 30,
      params.sort,
      params.sortDir,
    );

    return BaseResponse.success<any>({
      statusCode: 200,
      success: true,
      errorType: null,
      errors: null,
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
        sort: params.sort,
        sortDir: params.sortDir,
        filter: params.filter || null,
      },
    });
  }
}
