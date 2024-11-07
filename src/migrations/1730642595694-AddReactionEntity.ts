import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReactionEntity1730642595694 implements MigrationInterface {
    name = 'AddReactionEntity1730642595694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reaction\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` varchar(255) NOT NULL, \`messageId\` varchar(255) NOT NULL, \`emoji\` varchar(10) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reaction\` ADD CONSTRAINT \`FK_e58a09ab17e3ce4c47a1a330ae1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reaction\` ADD CONSTRAINT \`FK_bf5949b492187c5a90f5aeb413a\` FOREIGN KEY (\`messageId\`) REFERENCES \`message\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reaction\` DROP FOREIGN KEY \`FK_bf5949b492187c5a90f5aeb413a\``);
        await queryRunner.query(`ALTER TABLE \`reaction\` DROP FOREIGN KEY \`FK_e58a09ab17e3ce4c47a1a330ae1\``);
        await queryRunner.query(`DROP TABLE \`reaction\``);
    }

}
