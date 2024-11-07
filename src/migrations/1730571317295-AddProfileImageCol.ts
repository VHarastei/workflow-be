import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfileImageCol1730571317295 implements MigrationInterface {
    name = 'AddProfileImageCol1730571317295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profileImage\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profileImage\``);
    }

}
