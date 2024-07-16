import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeMessageForeingKeyCol1721135300844 implements MigrationInterface {
    name = 'ChangeMessageForeingKeyCol1721135300844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_0d6f621aae0a97a6d30c121ffcb\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`updatedBy\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_446251f8ceb2132af01b68eb593\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_446251f8ceb2132af01b68eb593\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`updatedBy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`createdBy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_0d6f621aae0a97a6d30c121ffcb\` FOREIGN KEY (\`createdBy\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
