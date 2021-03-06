import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import BaseEntity from './BaseEntity';
import { Company } from './Company';

export type UserRoleType = 'admin' | 'editor' | 'ghost';

@Entity()
export class User extends BaseEntity {
  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;

  @ManyToOne(type => Company, { nullable: true })
  @JoinColumn()
  company: Company;
}

export const userAdminColumns = [
  {
    id: 'id',
    label: 'ID',
    type: 'number',
    options: {},
    required: false,
    create: {
      display: false,
      editable: false,
    },
    update: {
      display: true,
      editable: false,
    },
    fixed: 'left',
  },
  {
    id: 'uuid',
    label: 'UUID',
    type: 'string',
    options: {},
    required: false,
    create: {
      display: false,
      editable: false,
    },
    update: {
      display: true,
      editable: false,
    },
  },
  {
    id: 'active',
    label: 'Active',
    type: 'boolean',
    options: {},
    required: true,
    create: {
      display: true,
      editable: true,
      default: true,
    },
    update: {
      display: true,
      editable: true,
      default: true,
    },
  },
  {
    id: 'firstName',
    label: 'First Name',
    type: 'string',
    options: {},
    required: true,
    create: {
      display: true,
      editable: true,
    },
    update: {
      display: true,
      editable: true,
    },
  },
  {
    id: 'lastName',
    label: 'Last Name',
    type: 'string',
    options: {},
    required: true,
    create: {
      display: true,
      editable: true,
    },
    update: {
      display: true,
      editable: true,
    },
  },
  {
    id: 'company',
    label: 'Company',
    type: 'model',
    options: {
      id: 'company',
      label: 'Company',
      nameAttribute: 'name',
    },
    required: true,
    create: {
      display: true,
      editable: true,
    },
    update: {
      display: true,
      editable: true,
    },
  },
  {
    id: 'age',
    label: 'Age',
    type: 'number',
    options: {
      min: 1,
      max: 100,
    },
    required: false,
    create: {
      display: true,
      editable: true,
      default: 18,
    },
    update: {
      display: true,
      editable: true,
    },
  },
  {
    id: 'birthday',
    label: 'Birthday',
    type: 'date',
    options: {},
    required: false,
    create: {
      display: true,
      editable: true,
    },
    update: {
      display: true,
      editable: true,
    },
  },
  {
    id: 'notes',
    label: 'Notes',
    type: 'text',
    options: {},
    required: false,
    create: {
      display: true,
      editable: true,
    },
    update: {
      display: true,
      editable: true,
    },
  },
  {
    id: 'createdAt',
    label: 'Created At',
    type: 'datetime',
    options: {},
    required: false,
    create: {
      display: false,
      editable: false,
    },
    update: {
      display: true,
      editable: false,
    },
  },
  {
    id: 'updatedAt',
    label: 'Updated At',
    type: 'datetime',
    options: {},
    required: false,
    create: {
      display: false,
      editable: false,
    },
    update: {
      display: true,
      editable: false,
    },
  },
  {
    id: 'version',
    label: 'Version',
    type: 'number',
    options: {},
    required: false,
    create: {
      display: false,
      editable: false,
    },
    update: {
      display: true,
      editable: false,
    },
  },
];
