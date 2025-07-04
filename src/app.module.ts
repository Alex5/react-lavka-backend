import { Module } from '@nestjs/common';
import { StoreModule } from './modules/store/store.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/user/entity/user.entity';
import { UserModule } from './modules/user/user.module';
import configuration from './config/app.config';
import { CatalogModule } from './modules/catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...configuration().database,
      entities: [UserEntity],
    }),
    StoreModule,
    CatalogModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
