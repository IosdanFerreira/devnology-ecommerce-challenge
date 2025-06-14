import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetAllProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return 'All products';
  }
}
