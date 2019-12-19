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
          label: 'id',
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
          label: 'uuid',
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
