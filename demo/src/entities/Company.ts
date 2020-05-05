import { Entity, Column } from 'typeorm';

import BaseEntity from './BaseEntity';

@Entity()
export class Company extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  name: string;
}

export const companyAdminColumns = [
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
    id: 'name',
    label: 'Name',
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