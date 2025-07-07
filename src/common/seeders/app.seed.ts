import { DataSource } from 'typeorm';
import { StoreEntity } from '../../modules/store/store.entity';
import { CatalogEntity } from '../../modules/catalog/catalog.entity';
import config from '../../config/app.config';
import { CategoryEntity } from '../../modules/category/category.entity';

const dataSource = new DataSource({
  ...config().database,
  entities: [StoreEntity, CatalogEntity],
  synchronize: false,
});

async function seed() {
  await dataSource.initialize();

  const catalog = dataSource.getRepository(CatalogEntity).create({
    name: 'Каталог магазина №1',
  });

  const store = dataSource.getRepository(StoreEntity).create({
    address: 'Москва, Тверская 12',
    catalog: catalog,
  });

  const categories = dataSource.getRepository(CategoryEntity).create({
    name: 'Придумано яндекс лавкой',
    items: [
      {
        name: 'Из лавки',
      },
      {
        name: 'Лавка 100',
      },
    ],
  });

  const products = dataSource.getRepository(ProductEntity).create({
    name: 'Придумано яндекс лавкой',
    items: [
      {
        name: 'Из лавки',
      },
      {
        name: 'Лавка 100',
      },
    ],
  });

  await dataSource.getRepository(CatalogEntity).save(catalog);

  await dataSource.getRepository(StoreEntity).save(store);

  console.log('✅ Seed completed!');

  await dataSource.destroy();
}

seed();
