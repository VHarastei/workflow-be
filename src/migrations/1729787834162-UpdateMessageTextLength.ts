import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessageTextLength1729787834162 implements MigrationInterface {
    name = 'UpdateMessageTextLength1729787834162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`text\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`text\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`text\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`text\` varchar(255) NOT NULL`);
    }

}
