import { Controller, Get, Query, Param } from '@nestjs/common';

import { GetAllAlbumsService } from '../core/service/get-all-albums.service';
import { AlbumsQueryDto } from '../core/dto/albums.query.dto';
import { FindAlbumPhotosService } from '../core/service/find-album-photos.service';

// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('albums')
export class AlbumsController {
  constructor(
    private readonly getAllAlbumsService: GetAllAlbumsService,
    private readonly findAlbumPhotosService: FindAlbumPhotosService,
  ) {}

  @Get()
  async getAllAlbums(@Query() query: AlbumsQueryDto) {
    const data = await this.getAllAlbumsService.execute(query);
    return {
      status: true,
      message: 'Álbuns encontrados com sucesso.',
      data,
    };
  }

  @Get(':albumId')
  async getAlbumPhotos(
    @Param('albumId') albumId: string,
    @Query() query: AlbumsQueryDto,
  ) {
    const data = await this.findAlbumPhotosService.execute(albumId, query);
    return {
      status: true,
      message: 'Fotos do álbum encontradas com sucesso.',
      data,
    };
  }

  //   @Get()
  //   findAll() {
  //     return this.usersService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.usersService.findOne(+id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.usersService.update(+id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.usersService.remove(+id);
  //   }
}
