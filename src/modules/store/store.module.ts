import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreEntity } from './store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [TypeOrmModule],
})
export class StoreModule {}
