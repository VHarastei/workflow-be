import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { config } from 'dotenv';
import { MailerModule } from '@nestjs-modules/mailer';

config();

const { EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: EMAIL_HOST,
        auth: {
          user: EMAIL_USERNAME,
          pass: EMAIL_PASSWORD,
        },
      },
    }),
  ],
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
