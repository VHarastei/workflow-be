import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFileEntity1731243963211 implements MigrationInterface {
    name = 'AddFileEntity1731243963211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`url\` varchar(255) NOT NULL, \`filename\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NOT NULL, \`messageId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`file\` ADD CONSTRAINT \`FK_a78a68c3f577a485dd4c741909f\` FOREIGN KEY (\`messageId\`) REFERENCES \`message\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_a78a68c3f577a485dd4c741909f\``);
        await queryRunner.query(`DROP TABLE \`file\``);
    }

}
