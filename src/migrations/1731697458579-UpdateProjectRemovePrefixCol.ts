import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProjectRemovePrefixCol1731697458579 implements MigrationInterface {
    name = 'UpdateProjectRemovePrefixCol1731697458579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`prefix\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`prefix\` varchar(255) NOT NULL`);
    }

}
