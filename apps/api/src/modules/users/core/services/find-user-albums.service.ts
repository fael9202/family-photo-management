import { EventEmitter2 } from '@nestjs/event-emitter';
import { AlbumsEvent } from 'src/shared/utils/enums/events.enum';
import { UsersQueryDto } from '../dto/users-query.dto';
import { Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';

export interface UserAlbums {
  albums: Album[];
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

@Injectable()
export class FindUserAlbumsService {
  constructor(private eventEmitter: EventEmitter2) {}

  async execute(userId: string, query: UsersQueryDto): Promise<UserAlbums> {
    const [userAlbums]: UserAlbums[] = await this.eventEmitter.emitAsync(
      AlbumsEvent.findAlbumsByUserId,
      userId,
      query,
    );
    console.log('userAlbums', userAlbums);

    return userAlbums;
  }
}
