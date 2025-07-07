import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogEntity } from './catalog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogEntity])],
  providers: [CatalogService],
  controllers: [CatalogController],
  exports: [TypeOrmModule],
})
export class CatalogModule {}
