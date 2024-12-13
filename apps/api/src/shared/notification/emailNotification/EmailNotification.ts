import {
  EmailNotificationInterface,
  EmailNotificatorStrategy,
} from 'src/shared/interfaces/notifications/notification.interface';
import { Notification } from '../Notification';

export class EmailNotification extends Notification {
  private strategy: EmailNotificatorStrategy;

  constructor(notificationData: EmailNotificationInterface) {
    super({
      messageFactory: notificationData.emailMessage,
      receiver: notificationData.to,
    });
    this.strategy = notificationData.sender;
  }
  createSubject(): string {
    return this.messageFactory.createSubject();
  }

  async send(): Promise<void> {
    await this.callbackToEmitEvent();
  }

  async callbackToEmitEvent(): Promise<void> {
    await this.strategy.send({
      email: this.receiver,
      subject: this.createSubject(),
      message: this.createMessage(),
    });
  }
}
