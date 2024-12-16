import { EventEmitter2 } from '@nestjs/event-emitter';
import { AlbumsEvent } from '../../../../shared/utils/enums/events.enum';
import { UsersQueryDto } from '../dto/users-query.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { UserRepository } from '../../persistence/user.repository';

export interface UserAlbums {
  albums: Album[];
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  userName?: string;
  email?: string;
}

@Injectable()
export class FindUserAlbumsService {
  constructor(
    private eventEmitter: EventEmitter2,
    private userRepository: UserRepository,
  ) {}

  async execute(userId: string, query: UsersQueryDto): Promise<UserAlbums> {
    const user = await this.userRepository.findUserName(Number(userId));

    if (!user) {
      throw new HttpException(
        { status: false, message: 'Usuário não encontrado.' },
        HttpStatus.NOT_FOUND,
      );
    }

    const [userAlbums]: UserAlbums[] = await this.eventEmitter.emitAsync(
      AlbumsEvent.findAlbumsByUserId,
      userId,
      query,
    );

    return {
      ...userAlbums,
      userName: user.username,
      email: user.email,
    };
  }
}
