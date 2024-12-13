import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/shared/config/database';

@Injectable()
export class UserRepository {
  constructor(private databaseService: DatabaseService) {}

  async findFirst(): Promise<User | null> {
    return this.databaseService.user.findFirst();
  }

  async updatePassword(id: number, password: string): Promise<User> {
    return this.databaseService.user.update({
      where: { id },
      data: { password },
    });
  }

  async findUserByUsername(username: string) {
    return this.databaseService.user.findFirst({
      where: { name: username.trim().toLowerCase() },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }
}
