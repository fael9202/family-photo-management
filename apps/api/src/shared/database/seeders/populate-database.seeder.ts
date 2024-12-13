import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Album, Photo, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { DatabaseService } from 'src/shared/config/database';
import { JsonPlaceholderService } from 'src/shared/http/jsonPlaceHolder/json-placeholder.service';
import { JsonPlaceHolderAlbum } from 'src/shared/utils/interfaces/jsonplaceholder/jsonplaceholder.albums.interface';
import { JsonPlaceHolderPhoto } from 'src/shared/utils/interfaces/jsonplaceholder/jsonplaceholder.photo.interface';
import { JsonPlaceholderUser } from 'src/shared/utils/interfaces/jsonplaceholder/jsonplaceholder.user.interface';

@Injectable()
export class PopulateDatabaseSeeder implements OnModuleInit {
  private readonly logger = new Logger(PopulateDatabaseSeeder.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jsonPlaceholderService: JsonPlaceholderService,
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
      const allUsers = await this.jsonPlaceholderService.getUsers();

      for (const user of allUsers) {
        const createdUser = await this.insertUser(user);

        const allAlbums = await this.jsonPlaceholderService.getAlbums(user.id);

        for (const album of allAlbums) {
          const createdAlbum = await this.insertAlbum(album, createdUser.id);

          const allPhotos = await this.jsonPlaceholderService.getPhotos(
            album.id,
          );

          for (const photo of allPhotos) {
            await this.insertPhoto(photo, createdAlbum.id);
          }
        }
      }
    } catch (error) {
      this.logger.error('Error populating database:', error.message);
    }
  }

  private async insertUser(user: JsonPlaceholderUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(`${user.username}`, 10);
    return await this.databaseService.user.create({
      data: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        password: hashedPassword,
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
  }

  private async insertAlbum(
    album: JsonPlaceHolderAlbum,
    userId: number,
  ): Promise<Album> {
    return await this.databaseService.album.create({
      data: {
        id: album.id,
        title: album.title,
        userId: userId,
      },
    });
  }

  private async insertPhoto(
    photo: JsonPlaceHolderPhoto,
    albumId: number,
  ): Promise<Photo> {
    return await this.databaseService.photo.create({
      data: {
        id: photo.id,
        albumId: albumId,
        title: photo.title,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl,
      },
    });
  }
}
