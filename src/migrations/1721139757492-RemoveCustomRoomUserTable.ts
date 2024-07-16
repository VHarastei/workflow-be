import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCustomRoomUserTable1721139757492 implements MigrationInterface {
    name = 'RemoveCustomRoomUserTable1721139757492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room_participants_user\` (\`roomId\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, INDEX \`IDX_8e45f67ab744f53f2b9be8bd0d\` (\`roomId\`), INDEX \`IDX_43676f54e34f42f2dc0982ca2d\` (\`userId\`), PRIMARY KEY (\`roomId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room_participants_user\` ADD CONSTRAINT \`FK_8e45f67ab744f53f2b9be8bd0da\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`room_participants_user\` ADD CONSTRAINT \`FK_43676f54e34f42f2dc0982ca2df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_participants_user\` DROP FOREIGN KEY \`FK_43676f54e34f42f2dc0982ca2df\``);
        await queryRunner.query(`ALTER TABLE \`room_participants_user\` DROP FOREIGN KEY \`FK_8e45f67ab744f53f2b9be8bd0da\``);
        await queryRunner.query(`DROP INDEX \`IDX_43676f54e34f42f2dc0982ca2d\` ON \`room_participants_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e45f67ab744f53f2b9be8bd0d\` ON \`room_participants_user\``);
        await queryRunner.query(`DROP TABLE \`room_participants_user\``);
    }

}
