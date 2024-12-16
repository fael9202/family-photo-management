import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SendEmailEvent } from './events/send-email.event';
import {
  EmailEvent,
  EmailNotificationProcess,
  NotificationQueues,
} from '../../../shared/utils/enums/events.enum';

@Injectable()
export class EmailListener {
  constructor(
    @InjectQueue(NotificationQueues.email)
    private readonly notificationQueue: Queue,
  ) {}

  @OnEvent(EmailEvent.passwordRecovery, { async: true })
  async handlePasswordRecovery(event: SendEmailEvent) {
    await this.notificationQueue.add(
      EmailNotificationProcess.passwordRecovery,
      event.payload,
    );
  }
}
