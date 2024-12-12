import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { DatabaseModule } from './shared/config/database';
import { LoggingInterceptor } from './shared/logging/interceptors/logging.interceptor';
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
