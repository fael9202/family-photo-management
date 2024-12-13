import { EmailSender } from 'src/shared/interfaces/notifications/notification.interface';

export class SendEmailEvent {
  public payload: EmailSender;

  constructor(payload: EmailSender) {
    this.payload = payload;
  }
}
