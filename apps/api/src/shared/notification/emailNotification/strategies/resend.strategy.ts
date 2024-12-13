import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;
  private logger = new Logger(EmailService.name);
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }
  async send({
    email,
    subject,
    message,
  }: {
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    const options = {
      from: process.env.RESEND_EMAIL_SENDER as string,
      to: [email],
      subject,
      html: message,
    };

    try {
      await this.resend.emails.send(options);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Erro ao enviar email');
    }
  }
}
