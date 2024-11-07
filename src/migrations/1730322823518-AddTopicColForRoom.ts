import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTopicColForRoom1730322823518 implements MigrationInterface {
    name = 'AddTopicColForRoom1730322823518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` ADD \`topic\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP COLUMN \`topic\``);
    }

}
