import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterOrderService } from './services/register/register-order.service';
import { RegisterOrderInputDto } from './services/register/dto/register-order-input.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterOrderResponseDto } from './services/register/dto/register-order-response.dto';
import { ErrorResponseDto } from 'src/shared/errors/dto/errors-response.dto';
import { JwtAuthGuard } from 'src/shared/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { GetAllOrdersService } from './services/get-all/get-all-orders.service';

@ApiTags('Pedidos')
@Controller('order')
export class OrderController {
  constructor(
    private readonly registerOrderService: RegisterOrderService,
    private readonly getAllOrdersService: GetAllOrdersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Cria o registro de um novo pedido de compra',
  })
  @ApiBody({
    type: RegisterOrderInputDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Pedido registrado com sucesso',
    type: RegisterOrderResponseDto,
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDto,
    description: 'Erro na validação dos parâmetros enviados',
  })
  async registerOrder(
    @Req() req: Request,
    @Body() body: RegisterOrderInputDto,
  ) {
    const user = req.user as { id: number };

    return await this.registerOrderService.execute(body, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos do usuário autenticado' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'perPage', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Pedidos listados com sucesso' })
  async findAll(
    @Req() req: Request,
    @Query('page') page = 1,
    @Query('perPage') perPage = 50,
  ) {
    const user = req.user as { id: number };

    return this.getAllOrdersService.execute(
      user.id,
      Number(page),
      Number(perPage),
    );
  }
}
