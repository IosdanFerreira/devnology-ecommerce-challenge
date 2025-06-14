import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegisterOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return 'register order';
  }
}
