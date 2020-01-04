import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  VersionColumn,
} from 'typeorm';

class BaseEntity {
  constructor(params) {
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        this[key] = value;
      });
    }
  }

  /**
   * Automatically generated, incremental, and human readable.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Automatically generated, but not incremental.
   * Using uuid does not expose the order of creation.
   */
  @Column()
  @Generated('uuid')
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}

export default BaseEntity;

export type AdminJsonType = {
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
