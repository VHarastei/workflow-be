import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodemailerService {
  constructor(private mailerService: MailerService) {}

  async sendInvitationEmail(email: string, token: string) {
    const url = `http://localhost:3000/register?token=${token}&email=${email}`;

    await this.mailerService.sendMail({
      to: email,
      from: 'Workflow <admin@workflow.com>',
      subject: 'Welcome to Workflow',
      html: `<h1>Welcome</h1><br /><b>Click here to register - <a href=${url}>Register</a></b>`,
    });
  }
}
