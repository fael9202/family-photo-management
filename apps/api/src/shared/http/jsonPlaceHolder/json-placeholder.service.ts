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
        `${process.env.JSONPLACEHOLDER_API_URL}/users`,
      ),
    );
    const users = usersResponse.data;
    return users;
  }

  async getAlbums(userId: number) {
    const albumsResponse = await lastValueFrom(
      this.httpService.get<JsonPlaceHolderAlbumResponse>(
        `${process.env.JSONPLACEHOLDER_API_URL}/users/${userId}/albums`,
      ),
    );
    const albums = albumsResponse.data;
    return albums;
  }

  async getPhotos(albumId: number) {
    const photosResponse = await lastValueFrom(
      this.httpService.get<JsonPlaceHolderPhotoResponse>(
        `${process.env.JSONPLACEHOLDER_API_URL}/photos?albumId=${albumId}`,
      ),
    );
    const photos = photosResponse.data;
    return photos;
  }
}
