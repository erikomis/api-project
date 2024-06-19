import { UserEntity } from 'src/user/entites/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'address',
})
export class AddressEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    name: 'user_id',
    type: 'integer',
    nullable: false,
  })
  userId: number;

  @Column({
    name: 'complement',
    type: 'varchar',
    nullable: true,
  })
  complement: string;

  @Column({
    name: 'number',
    type: 'integer',
    nullable: false,
  })
  numberAddress: number;

  @Column({
    name: 'cep',
    type: 'varchar',
    nullable: false,
  })
  cep: string;

  @Column({
    name: 'city_id',
    type: 'integer',
    nullable: false,
  })
  cityId: number;

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

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user?: UserEntity;
}
