import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/shared/config/database';

@Injectable()
export class UserRepository {
  constructor(private databaseService: DatabaseService) {}

  async findFirst(): Promise<User | null> {
    return this.databaseService.user.findFirst({
      where: {
        id: 1,
      },
    });
  }

  async updatePassword(id: number, password: string): Promise<User> {
    return this.databaseService.user.update({
      where: { id },
      data: { password },
    });
  }

  async findUserByUsername(username: string) {
    return this.databaseService.user.findFirst({
      where: { username: username.trim().toLowerCase() },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }

  //faça um omit para o password na tipagem do retorno
  async findAll(
    page: number,
    pageSize: number,
  ): Promise<Omit<User, 'password'>[]> {
    return this.databaseService.user.findMany({
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
      select: {
        website: true,
        name: true,
        email: true,
        username: true,
        password: false,
        id: true,
        address: true,
        phone: true,
        company: true,
      },
    });
  }

  async getAllUsersCount(): Promise<number> {
    return this.databaseService.user.count();
  }
}
