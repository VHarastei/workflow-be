import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1731689967839 implements MigrationInterface {
    name = 'UpdateUserEntity1731689967839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`telegramId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`telegramId\``);
    }

}
