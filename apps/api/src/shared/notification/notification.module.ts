import { Module } from '@nestjs/common';

import { NotificationQueueModule } from './jobs';
import { EmailListener } from './emailNotification/email.listener';
import { QueueConfigModule } from '../config/queues';

@Module({
  imports: [NotificationQueueModule, QueueConfigModule],
  providers: [
    //Listeners
    EmailListener,
  ],
  exports: [
    //Listeners
    EmailListener,
  ],
})
export class NotificationModule {}
