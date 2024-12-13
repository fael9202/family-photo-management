import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SendEmailEvent } from './events/send-email.event';

import {
  EmailEvent,
  EmailNotificationProcess,
  NotificationQueues,
} from 'src/shared/enums/events.enum';

@Injectable()
export class EmailListener {
  constructor(
    @InjectQueue(NotificationQueues.email)
    private readonly notificationQueue: Queue,
  ) {}

  @OnEvent(EmailEvent.confirmation, { async: true })
  async handleConfirmation(event: SendEmailEvent) {
    await this.notificationQueue.add(
      EmailNotificationProcess.confirmation,
      event.payload,
    );
  }

  @OnEvent(EmailEvent.createAccount, { async: true })
  async handleCreateAccount(event: SendEmailEvent) {
    console.log('event.payload', event.payload);
    await this.notificationQueue.add(
      EmailNotificationProcess.createAccount,
      event.payload,
    );
  }

  @OnEvent(EmailEvent.newAffiliate, { async: true })
  async handleNewAfilliate(event: SendEmailEvent) {
    console.log('event.payload', event.payload);
    await this.notificationQueue.add(
      EmailNotificationProcess.newAffiliate,
      event.payload,
    );
  }

  @OnEvent(EmailEvent.sendMed, { async: true })
  async handleNewMedContest(event: SendEmailEvent) {
    await this.notificationQueue.add(
      EmailNotificationProcess.sendMed,
      event.payload,
    );
  }

  @OnEvent(EmailEvent.passwordRecovery, { async: true })
  async handlePasswordRecovery(event: SendEmailEvent) {
    await this.notificationQueue.add(
      EmailNotificationProcess.passwordRecovery,
      event.payload,
    );
  }
}
