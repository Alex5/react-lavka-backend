import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}
}
