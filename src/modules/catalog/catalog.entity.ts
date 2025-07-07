import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { StoreEntity } from '../store/store.entity';
import { CategoryEntity } from '../category/category.entity';

@Entity('catalog')
export class CatalogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => StoreEntity, (store) => store.catalog)
  store: StoreEntity;

  @OneToMany(() => CategoryEntity, (category) => category.catalog)
  categories: CategoryEntity[];
}
