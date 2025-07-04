import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;
}
