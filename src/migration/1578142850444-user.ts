import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1578142850444 implements MigrationInterface {
  name = 'User1578142850444';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `age` int NOT NULL, `birthday` date NULL, `role` enum ('admin', 'editor', 'ghost') NOT NULL DEFAULT 'ghost', `notes` text NULL, `config` json NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `user`', undefined);
  }
}
