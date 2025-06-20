import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetAllProductsService } from './services/get-all/get-all-products.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response.dto';
import { GetAllProductsParamsDto } from './dto/get-all-products-params.dto';
import { GetProductByIdService } from './services/get-by-id/get-product-by-id.service';

@ApiTags('Produtos')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly getAllProductsService: GetAllProductsService,
    private readonly getProductById: GetProductByIdService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Busca todos os produtos com paginação, ordenação e filtro',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'sortDir', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description:
      'Texto para filtrar por nome, descrição, departamento ou categoria',
  })
  @ApiQuery({
    name: 'hasDiscount',
    required: false,
    type: Boolean,
    description: 'Filtra produtos com desconto (true/false)',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    description: 'Filtrar por categoria exata',
  })
  @ApiQuery({
    name: 'supplier',
    required: false,
    type: String,
    description: 'Filtrar por fornecedor',
  })
  @ApiQuery({
    name: 'material',
    required: false,
    type: String,
    description: 'Filtrar por material',
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    type: Number,
    description: 'Preço mínimo',
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    type: Number,
    description: 'Preço máximo',
  })
  @ApiResponse({
    status: 200,
    description:
      'Retorna uma lista de produtos paginada, com opção de ordenar e filtrar.',
    type: [ProductResponseDto],
  })
  async getAllProducts(@Query() query: GetAllProductsParamsDto) {
    const {
      page,
      perPage,
      sort,
      sortDir,
      filter,
      hasDiscount,
      category,
      supplier,
      material,
      minPrice,
      maxPrice,
    } = query;

    return await this.getAllProductsService.execute({
      page,
      perPage,
      sort,
      sortDir,
      filter,
      hasDiscount,
      category,
      supplier,
      material,
      minPrice,
      maxPrice,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um produto específico pelo ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do produto' })
  @ApiResponse({
    status: 200,
    description: 'Retorna os dados de um produto pelo ID',
    type: ProductResponseDto,
  })
  async findProductById(@Param('id') id: string) {
    return await this.getProductById.execute(id);
  }
}
