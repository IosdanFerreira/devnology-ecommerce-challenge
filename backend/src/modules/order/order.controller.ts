import { Body, Controller, Post } from '@nestjs/common';
import { RegisterOrderService } from './register/register-order.service';
import { RegisterOrderInputDto } from './register/dto/register-order-input.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterOrderResponseDto } from './register/dto/register-order-response.dto';
import { ErrorResponseDto } from 'src/errors/dto/errors-response.dto';

@ApiTags('Pedidos')
@Controller('order')
export class OrderController {
  constructor(private readonly registerOrderService: RegisterOrderService) {}

  @Post()
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
  async registerOrder(@Body() dto: RegisterOrderInputDto) {
    return await this.registerOrderService.execute(dto);
  }
}
