import { DatabaseService } from './database.service';
import { Global, Module } from '@nestjs/common';
import { PopulateDatabaseSeeder } from 'src/shared/database/seeders/populate-database.seeder';
import { JsonPlaceHolderModule } from 'src/shared/http/jsonPlaceHolder/json-placeholder.module';

@Global()
@Module({
  imports: [JsonPlaceHolderModule],
  providers: [DatabaseService, PopulateDatabaseSeeder],
  exports: [DatabaseService], //export this service to use in other modules
})
export class DatabaseModule {}
