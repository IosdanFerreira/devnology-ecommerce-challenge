import { Controller, Post } from '@nestjs/common';
import { RegisterOrderService } from './register-order.service';

@Controller('register-order')
export class RegisterOrderController {
  constructor(private readonly registerOrderService: RegisterOrderService) {}

  @Post()
  async registerOrder() {
    return await this.registerOrderService.execute();
  }
}
