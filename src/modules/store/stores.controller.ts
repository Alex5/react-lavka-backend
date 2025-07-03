import { Controller } from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('store')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}
}
