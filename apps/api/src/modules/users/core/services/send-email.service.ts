import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dto/send-email.dto';
import { EmailEvent } from 'src/shared/enums/events.enum';
import { SendEmailEvent } from 'src/shared/notification/emailNotification/events/send-email.event';
import { EmailNotificationEmitter } from '../events/email-notification-emitter';

@Injectable()
export class SendEmailService {
  constructor(private emailNotificationEmitter: EmailNotificationEmitter) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    // enviar email
    await this.emailNotificationEmitter.emitEvent(
      EmailEvent.passwordRecovery,
      new SendEmailEvent({ userEmail: sendEmailDto.email }),
    );
  }
}
