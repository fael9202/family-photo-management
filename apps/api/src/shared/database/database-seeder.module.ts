import { Module } from '@nestjs/common';
import { PopulateDatabaseSeeder } from 'src/shared/database/seeders/populate-database.seeder';
import { JsonPlaceHolderModule } from '../http/jsonPlaceHolder/json-placeholder.module';

@Module({
  imports: [JsonPlaceHolderModule],
  providers: [PopulateDatabaseSeeder],
  exports: [PopulateDatabaseSeeder], //export this service to use in other modules
})
export class DatabaseSeederModule {}
