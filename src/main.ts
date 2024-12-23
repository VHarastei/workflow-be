import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  app.useStaticAssets(join(__dirname, '../..', 'files'), {
    prefix: '/files/',
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Your API Name')
    .setDescription('API documentation for your application')
    .setVersion('1.0')
    .addBearerAuth() // Adds Bearer token authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger UI endpoint

  await app.listen(process.env.PORT);
}
bootstrap();
