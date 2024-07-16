import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomUserTable1721137930729 implements MigrationInterface {
    name = 'AddRoomUserTable1721137930729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room_user\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` varchar(255) NOT NULL, \`roomId\` varchar(255) NOT NULL, \`createdBy\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`createdBy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`roomId\`, \`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`roomId\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`roomId\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`roomId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`id\`, \`roomId\`)`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`userId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`id\`, \`roomId\`, \`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_507b03999779b22e06538595de\` ON \`room_user\` (\`roomId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_27dad61266db057665ee1b13d3\` ON \`room_user\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD CONSTRAINT \`FK_507b03999779b22e06538595dec\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD CONSTRAINT \`FK_27dad61266db057665ee1b13d3d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP FOREIGN KEY \`FK_27dad61266db057665ee1b13d3d\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP FOREIGN KEY \`FK_507b03999779b22e06538595dec\``);
        await queryRunner.query(`DROP INDEX \`IDX_27dad61266db057665ee1b13d3\` ON \`room_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_507b03999779b22e06538595de\` ON \`room_user\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`id\`, \`roomId\`)`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`roomId\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`roomId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`roomId\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`userId\`, \`roomId\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`createdBy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`DROP TABLE \`room_user\``);
    }

}
