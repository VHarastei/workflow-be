import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectsTable1721241519798 implements MigrationInterface {
    name = 'AddProjectsTable1721241519798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`name\` varchar(255) NOT NULL, \`prefix\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room\` ADD \`projectId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room\` ADD CONSTRAINT \`FK_d75282d977292da5d5868c6d431\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_d75282d977292da5d5868c6d431\``);
        await queryRunner.query(`ALTER TABLE \`room\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`DROP TABLE \`project\``);
    }

}
