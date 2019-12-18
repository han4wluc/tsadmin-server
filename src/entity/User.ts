import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  static toAdminJson = (): any => {
    return {
      columns: [
        {
          label: 'id',
          type: 'uuid',
          create: {
            display: false,
          },
          update: {
            display: true,
            editable: false,
          },
        },
        {
          label: 'firstName',
          type: 'string',
          required: true,
          create: {
            display: true,
          },
          update: {
            display: true,
            editable: true,
          },
        },
        {
          label: 'lastName',
          type: 'string',
          create: {
            display: true,
          },
          update: {
            display: true,
            editable: true,
          },
        },
        {
          label: 'age',
          type: 'number',
          create: {
            display: true,
            default: 18,
          },
          update: {
            display: true,
            editable: true,
          },
        },
      ],
    };
  };
}
