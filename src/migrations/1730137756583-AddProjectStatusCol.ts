import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectStatusCol1730137756583 implements MigrationInterface {
    name = 'AddProjectStatusCol1730137756583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`status\``);
    }

}
