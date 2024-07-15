import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config'; //installed package
import { config } from 'dotenv';

config();

const configService = new ConfigService();

console.log('conf', configService.get('DB_HOST'));

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/**/*{.ts,.js}'],
});
