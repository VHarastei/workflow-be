import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTableCreatedAtColumn1721119853694 implements MigrationInterface {
    name = 'AddUsersTableCreatedAtColumn1721119853694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
    }

}
