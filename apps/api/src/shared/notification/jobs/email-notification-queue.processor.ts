/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Processor,
  OnQueueCompleted,
  Process,
  OnQueueFailed,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { EmailSender } from 'src/shared/interfaces/notifications/notification.interface';
import { EmailNotification } from '../emailNotification/EmailNotification';
import { ChangePasswordEmailMessage } from '../emailNotification/factories/change-password';
import { EmailService } from '../emailNotification/strategies/resend.strategy';
import {
  EmailNotificationProcess,
  NotificationQueues,
} from 'src/shared/enums/events.enum';

@Injectable()
@Processor(NotificationQueues.email)
export class EmailNotificationProcessor {
  constructor() {}

  @OnQueueCompleted()
  onCompleted(job: Job) {
    // console.log('encio de email', job);
    return job.discard();
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    console.log(
      `Job ${job.id} of type ${job.name} failed: ${error.message}, job attempts: ${job.attemptsMade}...`,
    );
    if (job.attemptsMade < 3) {
      return job.retry();
    }
    return job.discard();
  }

  @Process(EmailNotificationProcess.passwordRecovery)
  async sendPasswordRecoveryEmail(job: Job<EmailSender>): Promise<void> {
    await new EmailNotification({
      emailMessage: new ChangePasswordEmailMessage(
        job.data.token ? job.data.token : '',
      ),
      to: job.data.userEmail,
      sender: new EmailService(),
    }).send();
  }
}
