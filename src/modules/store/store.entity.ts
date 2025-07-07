import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CatalogEntity } from '../catalog/catalog.entity';

@Entity('store')
export class StoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @OneToOne(() => CatalogEntity, (catalog) => catalog.store, {
    cascade: true,
  })
  @JoinColumn()
  catalog: CatalogEntity | null;
}
