import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogEntity } from './catalog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(CatalogEntity)
    private catalogRepository: Repository<CatalogEntity>,
  ) {}

  getCatalogByStore({ store_id }: { store_id: string }) {
    return this.catalogRepository.findOne({
      where: {
        id: store_id,
      },
      relations: ['store'],
    });
  }
}
