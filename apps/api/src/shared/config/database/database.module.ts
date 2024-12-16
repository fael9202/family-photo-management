import { DatabaseService } from './database.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], //export this service to use in other modules
})
export class DatabaseModule {}
