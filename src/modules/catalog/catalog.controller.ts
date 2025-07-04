import { Controller, Get, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller({
  path: 'catalog',
  version: '1',
})
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get(':store_id')
  getCatalogByStoreId(@Param('store_id') store_id: number) {
    return this.catalogService.getCatalogByStore({ store_id });
  }
}
