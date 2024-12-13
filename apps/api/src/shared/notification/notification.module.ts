import { Module } from '@nestjs/common';

import { EmailNotificationEmitter } from './emailNotification/EmailNotificationEmitter';
import { NotificationQueueModule } from './jobs';
import { EmailListener } from './emailNotification/email.listener';
import { QueueConfigModule } from '../config/queues';

@Module({
  imports: [NotificationQueueModule, QueueConfigModule],
  providers: [
    //Listeners
    EmailListener,

    //Emitters
    EmailNotificationEmitter,
  ],
  exports: [
    //Listeners
    EmailListener,

    //Emitters
    EmailNotificationEmitter,
  ],
})
export class NotificationModule {}
