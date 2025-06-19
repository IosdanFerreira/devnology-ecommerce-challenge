import { Injectable } from '@nestjs/common';
import { suppliers } from 'src/constants/suppliersUrl';
import { NotFoundError } from 'src/errors';
import { BaseResponse } from 'src/utils/baseResponse.utils';
import { fetchProductById } from '../../integrations/fetchProductById';

@Injectable()
export class GetProductByIdService {
  /**
   * Executa a busca de um produto por ID, verificando se o ID é brasileiro ou europeu,
   * fazendo a chamada para a API correspondente e retornando o produto encontrado.
   *
   * @param id - ID do produto a ser buscado, com prefixo indicando a origem.
   * @returns Resposta de sucesso com o produto encontrado ou lança um erro de não encontrado.
   */
  async execute(id: string) {
    // Verifica se o ID é de um produto brasileiro
    const isBrazilianId = id.includes('brazilian');
    // Verifica se o ID é de um produto europeu
    const isEuropeanId = id.includes('european');

    if (isBrazilianId) {
      // Remove o prefixo 'brazilian-' do ID
      const idWithoutPrefix = id.replace('brazilian-', '');

      // Busca o produto na API brasileira
      const product = await fetchProductById(
        suppliers.brazilianSupplierUrl,
        idWithoutPrefix,
        'brazilian',
      );

      if (!product) {
        // Lança erro se o produto não for encontrado
        throw new NotFoundError('Produto não encontrado');
      }

      // Retorna resposta de sucesso com o produto encontrado
      return BaseResponse.success({
        statusCode: 200,
        message: 'Produto encontrado com sucesso',
        data: product,
      });
    }

    if (isEuropeanId) {
      // Remove o prefixo 'european-' do ID
      const idWithoutPrefix = id.replace('european-', '');

      // Busca o produto na API europeia
      const product = await fetchProductById(
        suppliers.europeanSupplierUrl,
        idWithoutPrefix,
        'european',
      );

      if (!product) {
        // Lança erro se o produto não for encontrado
        throw new NotFoundError('Produto não encontrado');
      }

      // Retorna resposta de sucesso com o produto encontrado
      return BaseResponse.success({
        statusCode: 200,
        message: 'Produto encontrado com sucesso',
        data: product,
      });
    }

    // Lança erro se o ID não corresponder a um produto brasileiro ou europeu
    throw new NotFoundError('Produto não encontrado');
  }
}
