import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  VersionColumn,
} from 'typeorm';

class BaseEntity {
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
