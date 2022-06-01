import { MailerService } from '@nestjs-modules/mailer';
import * as nodemailer from 'nodemailer';
import { User } from '../../auth/interfaces/user.interface';

export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User) {
    const url = `${process.env.BACK_END_SERVER}auth/confirm/${user.email}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_APIKEY,
      },
    });
    const info = await transporter.sendMail({
      from: '"Maïssa Nouhaud 👻" <maissanouhaud@outlook.fr>',
      to: user.email,
      subject: 'Bienvenue ! :)',
      html: `<p>Hey ${user.firstname},</p><p>Please click below to confirm your email</p><p><a href="${url}">Confirm</a></p><p>If you did not request this email you can safely ignore it.</p>`,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
