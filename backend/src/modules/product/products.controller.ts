import { Controller, Get, Query } from '@nestjs/common';
import { GetAllProductsService } from './get-all/get-all-products.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductResponseDto } from './dto/productResponse.dto';
import { GetAllProductsQueryDto } from './dto/getAllProductsQuery.dto';

@ApiTags('Produtos')
@Controller('products')
export class ProductsController {
  constructor(private readonly getAllProductsService: GetAllProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Busca todos os produtos com paginação, ordenação e filtro',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página (default 1)',
  })
  @ApiQuery({
    name: 'perPage',
    required: false,
    type: Number,
    description: 'Itens por página (default 30)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Campo para ordenar os produtos',
  })
  @ApiQuery({
    name: 'sortDir',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Direção da ordenação (asc ou desc)',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description:
      'Texto para filtrar produtos por nome, descrição, departamento ou categoria',
  })
  @ApiResponse({
    status: 200,
    description:
      'Retorna uma lista de produtos paginada, com opção de ordenar e filtrar.',
    type: [ProductResponseDto],
  })
  async getAllProducts(@Query() query: GetAllProductsQueryDto) {
    const { page, perPage, sort, sortDir, filter } = query;

    return await this.getAllProductsService.execute(
      page,
      perPage,
      sort,
      sortDir,
      filter,
    );
  }
}
