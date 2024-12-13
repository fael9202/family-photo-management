import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { DatabaseModule } from './shared/config/database';
import { LoggingInterceptor } from './shared/logging/interceptors/logging.interceptor';
import { UsersModule } from './modules/users/users.module';
import { QueueConfigModule } from './shared/config/queues';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './modules/auth/auth.module';
import { AlbumsModule } from './modules/albums/albums.module';
@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    QueueConfigModule,
    EventEmitterModule.forRoot(),
    AuthModule,
    AlbumsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
