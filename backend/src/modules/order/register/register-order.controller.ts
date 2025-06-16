import { Body, Controller, Post } from '@nestjs/common';
import { RegisterOrderService } from './register-order.service';
import { RegisterOrderDto } from './dto/register-order.dto';

@Controller('register-order')
export class RegisterOrderController {
  constructor(private readonly registerOrderService: RegisterOrderService) {}

  @Post()
  async registerOrder(@Body() dto: RegisterOrderDto) {
    return await this.registerOrderService.execute(dto);
  }
}
