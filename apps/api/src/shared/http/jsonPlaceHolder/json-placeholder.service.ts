import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { JsonPlaceHolderUserResponse } from '../../utils/interfaces/jsonplaceholder/jsonplaceholder.user.interface';
import { JsonPlaceHolderAlbumResponse } from '../../utils/interfaces/jsonplaceholder/jsonplaceholder.albums.interface';
import { JsonPlaceHolderPhotoResponse } from '../../utils/interfaces/jsonplaceholder/jsonplaceholder.photo.interface';

@Injectable()
export class JsonPlaceholderService {
  private readonly logger = new Logger(JsonPlaceholderService.name);

  constructor(private readonly httpService: HttpService) {}

  async getUsers() {
    const usersResponse = await lastValueFrom(
      this.httpService.get<JsonPlaceHolderUserResponse>(
        'https://jsonplaceholder.typicode.com/users',
      ),
    );
    const users = usersResponse.data;
    return users;
  }

  async getAlbums(userId: number) {
    const albumsResponse = await lastValueFrom(
      this.httpService.get<JsonPlaceHolderAlbumResponse>(
        `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
      ),
    );
    const albums = albumsResponse.data;
    return albums;
  }

  async getPhotos(albumId: number) {
    const photosResponse = await lastValueFrom(
      this.httpService.get<JsonPlaceHolderPhotoResponse>(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
      ),
    );
    const photos = photosResponse.data;
    return photos;
  }
}
