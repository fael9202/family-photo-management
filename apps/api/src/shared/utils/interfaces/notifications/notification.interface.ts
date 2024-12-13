export interface EmailNotificationInterface {
  to: string;
  sender: EmailNotificatorStrategy;
  emailMessage: MessageFactory;
  attachment?: { filename: string; content: string; type: string }; // Suporte opcional ao anexo
}

export interface OneSignalNotificationInterface {
  player_ids: string | string[];
  message: MessageFactory;
}

export interface SmsNotificationInterface {
  recepient: string;
  sender: SmsNotificatorStrategy;
  message: MessageFactory;
}

export interface MessageFactory {
  createMessage(): string;
  createSubject(): string;
}

export interface EmailNotificatorStrategy {
  send({
    email,
    subject,
    message,
    attachment,
    token,
  }: {
    email: string | string[];
    subject: string;
    message: string;
    attachment?: { filename: string; content: string; type: string }; // Suporte opcional ao anexo
    token?: string;
  }): Promise<void>;
}

export interface SmsNotificatorStrategy {
  send({
    to,
    message,
  }: {
    to: string | string[];
    message: string;
  }): Promise<void>;
}

export interface EmailSender {
  userEmail: string;
  token?: string;
  name?: string;
  fatherName?: string;
  fatherEmail?: string;
  content?: string;
  description?: string;
  identifier?: string;
  order_processor_id?: string;
}

export interface OneSignalSender {
  player_ids: string[];
}

export interface SmsSender {
  recipientPhone: string;
  token: string;
}

export interface ZenviaSmsBody {
  from: string;
  to: string;
  contents: [
    {
      type: string;
      text: string;
    },
  ];
}
