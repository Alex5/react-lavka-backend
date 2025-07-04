import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { StoreEntity } from './entities/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
