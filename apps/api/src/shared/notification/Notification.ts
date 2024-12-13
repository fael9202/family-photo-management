import { MessageFactory } from '../utils/interfaces/notifications/notification.interface';

interface NotificationInterface {
  messageFactory: MessageFactory;
  receiver: string | string[];
}

export abstract class Notification {
  protected messageFactory: MessageFactory;
  protected receiver: string | string[];
  constructor(props: NotificationInterface) {
    this.messageFactory = props.messageFactory;
    this.receiver = props.receiver;
  }
  abstract send(): void;
  createMessage(): string {
    return this.messageFactory.createMessage();
  }
}
