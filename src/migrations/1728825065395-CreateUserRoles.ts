import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoles1728825065395 implements MigrationInterface {
  name = 'CreateUserRoles1728825065395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
  }
}
