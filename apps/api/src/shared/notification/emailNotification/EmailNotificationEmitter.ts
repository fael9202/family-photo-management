import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationEmitter } from '../NotificationEmitter';
import { HttpException, Injectable } from '@nestjs/common';
import { SendEmailEvent } from './events/send-email.event';
import { EmailEvent } from 'src/shared/enums/events.enum';

@Injectable()
export class EmailNotificationEmitter extends NotificationEmitter<
  SendEmailEvent,
  EmailEvent
> {
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
      console.error(`Erro ao emitir evento: ${error.message}`);
      throw new HttpException(
        { status: false, message: 'Erro interno do servidor' },
        500,
      );
    }
  }
}
