import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../persistence/user.repository';
import { User } from '@prisma/client';
import { UsersQueryDto } from '../dto/users-query.dto';

@Injectable()
export class GetAllUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: UsersQueryDto): Promise<{
    users: Omit<User, 'password'>[];
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
  }> {
    const { page, pageSize } = query;
    const users = await this.userRepository.findAll(
      Number(page),
      Number(pageSize),
    );
    const usersCount = await this.userRepository.getAllUsersCount();

    const totalPages = Math.ceil(usersCount / Number(pageSize));
    const currentPage = Number(page);

    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    return {
      users,
      totalPages,
      currentPage,
      nextPage,
      prevPage,
    };
  }
}
