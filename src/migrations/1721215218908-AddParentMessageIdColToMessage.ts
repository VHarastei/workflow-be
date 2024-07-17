import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParentMessageIdColToMessage1721215218908 implements MigrationInterface {
    name = 'AddParentMessageIdColToMessage1721215218908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`parentMessageId\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`parentMessageId\``);
    }

}
