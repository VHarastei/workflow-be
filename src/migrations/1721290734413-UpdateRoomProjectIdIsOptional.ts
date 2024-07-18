import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRoomProjectIdIsOptional1721290734413 implements MigrationInterface {
    name = 'UpdateRoomProjectIdIsOptional1721290734413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_d75282d977292da5d5868c6d431\``);
        await queryRunner.query(`ALTER TABLE \`room\` CHANGE \`projectId\` \`projectId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`room\` ADD CONSTRAINT \`FK_d75282d977292da5d5868c6d431\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_d75282d977292da5d5868c6d431\``);
        await queryRunner.query(`ALTER TABLE \`room\` CHANGE \`projectId\` \`projectId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room\` ADD CONSTRAINT \`FK_d75282d977292da5d5868c6d431\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
