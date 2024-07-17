import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdaeParentMessageIdCol1721215314189 implements MigrationInterface {
    name = 'UpdaeParentMessageIdCol1721215314189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`parentMessageId\` \`parentMessageId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`parentMessageId\` \`parentMessageId\` varchar(255) NOT NULL`);
    }

}
