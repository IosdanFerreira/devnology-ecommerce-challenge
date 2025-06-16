import { GeneratePaginationResponseInterface } from 'src/interfaces/generatePaginationResponse.interface';
import { SortDirection } from 'src/interfaces/meta.interface';

/**
 * Gera uma paginação com base nos dados recebidos.
 *
 * @param data - Dados a serem paginados.
 * @param page - Número da página a ser retornada.
 * @param limit - Número de itens por página.
 * @param sort - Nome do campo que será usado para ordenar os dados.
 * @param sortDir - Direção da ordenação.
 * @returns Um objeto com as informações de paginação e dados paginados.
 */

interface Sortable {
  id: string;
  [key: string]: any;
}

/**
 * Gera uma pagina o com base nos dados recebidos.
 *
 * @param data - Dados a serem paginados.
 * @param page - N mero da p gina a ser retornada.
 * @param limit - N mero de itens por p gina.
 * @param sort - Nome do campo que ser  usado para ordenar os dados.
 * @param sortDir - Dire o da ordena o.
 * @returns Um objeto com as informa es de pagina o e dados paginados.
 */
export function GeneratePagination<T extends Sortable>(
  data: T[],
  page: number,
  limit: number,
  sort: string,
  sortDir: SortDirection,
): GeneratePaginationResponseInterface<T> {
  // Ordena os dados de acordo com os parâmetro sort(nome do campo quer será usado para ordenar) e sortDir(direção da ordenação)
  if (sort) {
    data.sort((a, b) => {
      // Se o campo de ordenação for 'id', usa a lógica especial para extrair o número
      if (sort === 'id') {
        const getNumberFromId = (id: string) => {
          const parts = id.split('-');
          return Number(parts[1]) || 0;
        };

        const aValue = getNumberFromId(a.id);
        const bValue = getNumberFromId(b.id);

        return sortDir === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Para outros campos, ordena normalmente
      const aValue = a[sort];
      const bValue = b[sort];

      if (aValue < bValue) {
        return sortDir === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDir === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  //  Calcula os dados que serão retornados na paginação
  const currentPage = Number(page);
  const perPage = Number(limit);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  //   Retorna os dados paginados
  const paginatedResult = data.slice(startIndex, endIndex);

  // Retorna um objeto com as informações de paginação e dados paginados
  return {
    data: paginatedResult,
    pagination: {
      totalItems,
      currentPage,
      perPage,
      totalPages,
      prevPage,
      nextPage,
    },
  };
}
