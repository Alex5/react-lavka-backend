import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CatalogEntity } from '../catalog/catalog.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CatalogEntity, (catalog) => catalog.categories, {
    onDelete: 'CASCADE',
  })
  catalog: CatalogEntity;

  @OneToMany(() => CategoryEntity, (category) => category)
  items: CategoryEntity[];
}
