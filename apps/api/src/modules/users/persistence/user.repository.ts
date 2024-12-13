import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/shared/config/database';

@Injectable()
export class UserRepository {
  constructor(private databaseService: DatabaseService) {}

  async findFirst(): Promise<User | null> {
    return this.databaseService.user.findFirst();
  }
}
