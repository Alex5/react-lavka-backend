// tests/entities.test.ts
import { DataSource, Repository } from 'typeorm';
import { StoreEntity } from '../../modules/store/store.entity';
import { CatalogEntity } from '../../modules/catalog/catalog.entity';
import { CategoryEntity } from '../../modules/category/category.entity';

describe('Entity Relations Tests', () => {
  let dataSource: DataSource;
  let storeRepo: Repository<StoreEntity>;
  let catalogRepo: Repository<CatalogEntity>;
  let categoryRepo: Repository<CategoryEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      entities: [StoreEntity, CatalogEntity, CategoryEntity],
      synchronize: true,
      logging: false,
    });
    await dataSource.initialize();

    storeRepo = dataSource.getRepository(StoreEntity);
    catalogRepo = dataSource.getRepository(CatalogEntity);
    categoryRepo = dataSource.getRepository(CategoryEntity);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  beforeEach(async () => {
    // Очищаем данные перед каждым тестом
    await categoryRepo.clear();
    await catalogRepo.clear();
    await storeRepo.clear();
  });

  test('Создание Store с Catalog через cascade', async () => {
    const store = new StoreEntity();
    store.address = 'ул. Тестовая, 1';

    const catalog = new CatalogEntity();
    catalog.name = 'Тестовый каталог';

    store.catalog = catalog;

    const savedStore = await storeRepo.save(store);

    expect(savedStore.id).toBeDefined();
    expect(savedStore.catalog.id).toBeDefined();
    expect(savedStore.catalog.name).toBe('Тестовый каталог');
  });

  test('Загрузка Store с Catalog', async () => {
    // Создаем данные
    const store = new StoreEntity();
    store.address = 'ул. Тестовая, 2';
    const catalog = new CatalogEntity();
    catalog.name = 'Каталог для загрузки';
    store.catalog = catalog;
    const savedStore = await storeRepo.save(store);

    // Загружаем с relations
    const loadedStore = await storeRepo.findOne({
      where: { id: savedStore.id },
      relations: ['catalog'],
    });

    expect(loadedStore).toBeDefined();
    expect(loadedStore?.catalog).toBeDefined();
    expect(loadedStore?.catalog.name).toBe('Каталог для загрузки');
  });

  test('Создание Category с привязкой к Catalog', async () => {
    // Создаем Store и Catalog
    const store = new StoreEntity();
    store.address = 'ул. Тестовая, 3';
    const catalog = new CatalogEntity();
    catalog.name = 'Каталог с категориями';
    store.catalog = catalog;
    await storeRepo.save(store);

    // Создаем Categories
    const category1 = new CategoryEntity();
    category1.name = 'Категория 1';
    category1.catalog = catalog;

    const category2 = new CategoryEntity();
    category2.name = 'Категория 2';
    category2.catalog = catalog;

    await categoryRepo.save([category1, category2]);

    // Проверяем загрузку
    const loadedCatalog = await catalogRepo.findOne({
      where: { id: catalog.id },
      relations: ['categories'],
    });

    expect(loadedCatalog?.categories).toHaveLength(2);
    expect(loadedCatalog?.categories.map((c) => c.name)).toContain(
      'Категория 1',
    );
    expect(loadedCatalog?.categories.map((c) => c.name)).toContain(
      'Категория 2',
    );
  });

  test('Каскадное удаление категорий при удалении каталога', async () => {
    // Создаем структуру данных
    const store = new StoreEntity();
    store.address = 'ул. Тестовая, 4';
    const catalog = new CatalogEntity();
    catalog.name = 'Каталог для удаления';
    store.catalog = catalog;
    await storeRepo.save(store);

    const category = new CategoryEntity();
    category.name = 'Категория для удаления';
    category.catalog = catalog;
    await categoryRepo.save(category);

    // Удаляем каталог
    await catalogRepo.delete(catalog.id);

    // Проверяем, что категория тоже удалилась
    const remainingCategories = await categoryRepo.find();
    expect(remainingCategories).toHaveLength(0);
  });

  test('Полная структура: Store -> Catalog -> Categories', async () => {
    const store = new StoreEntity();
    store.address = 'ул. Полная структура, 1';

    const catalog = new CatalogEntity();
    catalog.name = 'Полный каталог';
    store.catalog = catalog;

    const savedStore = await storeRepo.save(store);

    // Добавляем категории
    const categories = [
      { name: 'Электроника' },
      { name: 'Одежда' },
      { name: 'Книги' },
    ].map((data) => {
      const category = new CategoryEntity();
      category.name = data.name;
      category.catalog = savedStore.catalog;
      return category;
    });

    await categoryRepo.save(categories);

    // Загружаем всю структуру
    const fullStructure = await storeRepo.findOne({
      where: { id: savedStore.id },
      relations: ['catalog', 'catalog.categories'],
    });

    expect(fullStructure?.catalog.categories).toHaveLength(3);
    expect(fullStructure?.catalog.categories.map((c) => c.name)).toEqual(
      expect.arrayContaining(['Электроника', 'Одежда', 'Книги']),
    );
  });
});

// Простой скрипт для ручного тестирования
// test-script.ts
async function testEntities() {
  const dataSource = new DataSource({
    type: 'postgres', // или ваш тип БД
    host: 'localhost',
    port: 5432,
    username: 'your_username',
    password: 'your_password',
    database: 'your_database',
    entities: [StoreEntity, CatalogEntity, CategoryEntity],
    synchronize: true, // ТОЛЬКО для тестирования!
    logging: true,
  });

  await dataSource.initialize();

  const storeRepo = dataSource.getRepository(StoreEntity);
  const categoryRepo = dataSource.getRepository(CategoryEntity);

  console.log('=== Создание Store с Catalog ===');
  const store = new StoreEntity();
  store.address = 'ул. Тестовая, 1';

  const catalog = new CatalogEntity();
  catalog.name = 'Мой каталог';
  store.catalog = catalog;

  const savedStore = await storeRepo.save(store);
  console.log('Создан Store:', savedStore.id);
  console.log('Создан Catalog:', savedStore.catalog.id);

  console.log('\n=== Добавление категорий ===');
  const category1 = new CategoryEntity();
  category1.name = 'Категория 1';
  category1.catalog = savedStore.catalog;

  const category2 = new CategoryEntity();
  category2.name = 'Категория 2';
  category2.catalog = savedStore.catalog;

  await categoryRepo.save([category1, category2]);
  console.log('Добавлены категории');

  console.log('\n=== Загрузка полной структуры ===');
  const fullData = await storeRepo.findOne({
    where: { id: savedStore.id },
    relations: ['catalog', 'catalog.categories'],
  });

  console.log('Store:', fullData?.address);
  console.log('Catalog:', fullData?.catalog.name);
  console.log(
    'Categories:',
    fullData?.catalog.categories.map((c) => c.name),
  );

  await dataSource.destroy();
}

// Запуск: npx ts-node test-script.ts
testEntities().catch(console.error);
