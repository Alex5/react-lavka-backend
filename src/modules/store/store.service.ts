import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
  ) {}

  getAllStores() {
    return this.storeRepository.find();
  }
}
