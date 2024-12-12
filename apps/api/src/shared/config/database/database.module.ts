import { HttpModule } from '@nestjs/axios';
import { DatabaseService } from './database.service';
import { Global, Module } from '@nestjs/common';
import { PopulateDatabaseSeeder } from 'src/shared/database/seeders/populate-database.seeder';

@Global()
@Module({
  imports: [HttpModule],
  providers: [DatabaseService, PopulateDatabaseSeeder],
  exports: [DatabaseService], //export this service to use in other modules
})
export class DatabaseModule {}
