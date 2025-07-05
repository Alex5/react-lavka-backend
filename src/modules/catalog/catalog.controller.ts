import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller({
  path: 'catalog',
  version: '1',
})
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  // api/v1/catalog?store_id=1
  @Get()
  getCatalogByStoreId(@Query('store_id') store_id: string) {
    return this.catalogService.getCatalogByStore({ store_id });
  }
}
