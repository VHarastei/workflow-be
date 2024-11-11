import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFileEntity1731349398899 implements MigrationInterface {
    name = 'UpdateFileEntity1731349398899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` ADD \`size\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` DROP COLUMN \`size\``);
    }

}
