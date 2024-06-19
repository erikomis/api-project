import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'state',
})
export class StateEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  // @Column({
  //   name: 'uf',
  //   type: 'varchar',
  //   nullable: false,
  // })
  // uf: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
