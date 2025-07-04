import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { StoreEntity } from '../store/entities/store.entity';

@Entity()
export class CatalogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => StoreEntity, (store) => store.id)
  store: StoreEntity;
}
