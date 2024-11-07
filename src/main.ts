import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

config();

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: true });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.enableCors({
    origin: 'http://localhost:3000', // The client origin(s) you want to allow
    methods: 'GET,POST,PUT,DELETE,PATCH', // Allowed HTTP methods
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(morgan('tiny'));

  console.log('dd', join(__dirname, '../..', 'files'));

  app.useStaticAssets(join(__dirname, '../..', 'files'), {
    prefix: '/files/',
  });

  await app.listen(process.env.PORT);
}
bootstrap();
