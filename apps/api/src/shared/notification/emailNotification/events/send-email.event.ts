import { EmailSender } from 'src/shared/utils/interfaces/notifications/notification.interface';

export class SendEmailEvent {
  public payload: EmailSender;

  constructor(payload: EmailSender) {
    this.payload = payload;
  }
}
