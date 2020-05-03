import { Entity, Column } from 'typeorm';

import BaseEntity from '~/entity/BaseEntity';

@Entity()
export class Company extends BaseEntity {
  @Column({
    type: 'varchar',
    default: true,
  })
  name: string;
}
