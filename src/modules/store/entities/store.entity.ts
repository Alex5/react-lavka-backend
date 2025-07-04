import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogEntity } from '../../catalog/catalog.entity';

export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @OneToOne(() => CatalogEntity, (catalog) => catalog.store, { cascade: true })
  catalog: CatalogEntity;
}
