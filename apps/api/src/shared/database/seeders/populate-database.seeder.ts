import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { JsonPlaceHolderUserResponse } from 'src/shared/interfaces/jsonplaceholder/jsonplaceholder.user.interface';
import { DatabaseService } from 'src/shared/config/database';

@Injectable()
export class PopulateDatabaseSeeder implements OnModuleInit {
  private readonly logger = new Logger(PopulateDatabaseSeeder.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly databaseService: DatabaseService,
  ) {}

  async onModuleInit() {
    this.logger.log('Starting database population...');
    await this.populateDatabase();
    this.logger.log('Database population completed.');
  }

  private async populateDatabase() {
    const users = await this.databaseService.user.findMany();
    if (users.length > 0) {
      this.logger.log('Database is already populated.');
      return;
    }

    try {
      // 1. Fetch users
      const usersResponse = await lastValueFrom(
        this.httpService.get<JsonPlaceHolderUserResponse>(
          'https://jsonplaceholder.typicode.com/users',
        ),
      );
      const users = usersResponse.data;

      for (const user of users) {
        // Insert user
        const createdUser = await this.databaseService.user.create({
          data: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            address: {
              create: {
                street: user.address.street,
                suite: user.address.suite,
                city: user.address.city,
                zipcode: user.address.zipcode,
              },
            },
            company: {
              create: {
                name: user.company.name,
                catchPhrase: user.company.catchPhrase,
                bs: user.company.bs,
              },
            },
          },
        });

        // 2. Fetch albums for the user
        const albumsResponse = await lastValueFrom(
          this.httpService.get(
            `https://jsonplaceholder.typicode.com/users/${user.id}/albums`,
          ),
        );
        const albums = albumsResponse.data;

        for (const album of albums) {
          // Insert album
          const createdAlbum = await this.databaseService.album.create({
            data: {
              id: album.id,
              title: album.title,
              userId: createdUser.id,
            },
          });

          // 3. Fetch photos for the album
          const photosResponse = await lastValueFrom(
            this.httpService.get(
              `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`,
            ),
          );
          const photos = photosResponse.data;

          for (const photo of photos) {
            // Insert photo
            await this.databaseService.photo.create({
              data: {
                id: photo.id,
                albumId: createdAlbum.id,
                title: photo.title,
                url: photo.url,
                thumbnailUrl: photo.thumbnailUrl,
              },
            });
          }
        }
      }
    } catch (error) {
      this.logger.error('Error populating database:', error.message);
    }
  }
}
