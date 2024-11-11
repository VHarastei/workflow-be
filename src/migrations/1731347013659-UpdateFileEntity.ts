import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFileEntity1731347013659 implements MigrationInterface {
    name = 'UpdateFileEntity1731347013659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` CHANGE \`url\` \`path\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`file\` DROP COLUMN \`path\``);
        await queryRunner.query(`ALTER TABLE \`file\` ADD \`path\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` DROP COLUMN \`path\``);
        await queryRunner.query(`ALTER TABLE \`file\` ADD \`path\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`file\` CHANGE \`path\` \`url\` varchar(255) NOT NULL`);
    }

}
