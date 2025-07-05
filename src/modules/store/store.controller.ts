import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller({
  path: 'store',
  version: '1',
})
export class StoreController {
  constructor(private readonly storesService: StoreService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllStores() {
    return this.storesService.getAllStores();
  }

  // @Get(':store_id/catalog')
  // getStoreCatalog() {
  //   this.storesService.getCatalog();
  // }
}
