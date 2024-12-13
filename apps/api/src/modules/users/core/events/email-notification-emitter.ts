import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationEmitter } from '../../../../shared/notification/NotificationEmitter';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SendEmailEvent } from '../../../../shared/notification/emailNotification/events/send-email.event';
import { EmailEvent } from 'src/shared/enums/events.enum';

@Injectable()
export class EmailNotificationEmitter extends NotificationEmitter<
  SendEmailEvent,
  EmailEvent
> {
  private logger = new Logger(EmailNotificationEmitter.name);

  constructor(eventEmitter: EventEmitter2) {
    super(eventEmitter);
  }

  async emitEvent(
    eventName: EmailEvent,
    eventInstance: SendEmailEvent,
  ): Promise<void> {
    try {
      this.eventEmitter.emit(eventName, eventInstance);
    } catch (error) {
      this.logger.error(`Erro ao emitir evento: ${error.message}`);
      throw new HttpException(
        { status: false, message: 'Erro interno do servidor' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
