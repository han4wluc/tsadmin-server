import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  VersionColumn,
} from 'typeorm';

type AdminJsonType = {
  columns: {
    id: string | number;
    label: string;
    type: string;
    options: object;
    required: boolean;
    create: {
      display: boolean;
      default?: any;
      editable: boolean;
    };
    update: {
      display: boolean;
      default?: any;
      editable: boolean;
    };
  }[];
};

function toObject(e: any): object {
  const obj = {};
  const length = Object.values(e).length / 2;
  Object.values<any>(e)
    .slice(0, length)
    .forEach(key => {
      obj[key] = e[key];
    });
  return obj;
}

export enum UserRole {
  admin,
  editor,
  ghost,
}

@Entity()
export class User {
  constructor(params) {
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        this[key] = value;
      });
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

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
    type: 'enum',
    enum: UserRole,
    default: UserRole.ghost,
  })
  role: UserRole;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  config: object;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  static toAdminJson = (): AdminJsonType => {
    return {
      columns: [
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
          id: 'role',
          label: 'Role',
          type: 'enum',
          options: {
            enumObject: toObject(UserRole),
          },
          required: false,
          create: {
            display: true,
            editable: true,
            default: UserRole.ghost,
          },
          update: {
            display: true,
            editable: true,
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
            default: false,
          },
          update: {
            display: true,
            editable: true,
            default: false,
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
          id: 'config',
          label: 'Config',
          type: 'json',
          options: {
            rows: 10,
          },
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
      ],
    };
  };
}
