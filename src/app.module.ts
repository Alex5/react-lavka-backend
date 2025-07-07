import { Module } from '@nestjs/common';
import { StoreModule } from './modules/store/store.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/app.config';
import { CatalogModule } from './modules/catalog/catalog.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...configuration().database,
      entities: [],
      autoLoadEntities: true,
    }),
    StoreModule,
    CatalogModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
