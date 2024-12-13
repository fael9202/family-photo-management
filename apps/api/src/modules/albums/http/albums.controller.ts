import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';

import { GetAllAlbumsService } from '../core/service/get-all-albums.service';
import { AlbumsQueryDto } from '../core/dto/albums.query.dto';
import { FindAlbumPhotosService } from '../core/service/find-album-photos.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { IUserGuard } from 'src/shared/utils/interfaces/user/user-guard.interface';
import { CreateAlbumDto } from '../core/dto/create-album.dto';
import { UpdateAlbumDto } from '../core/dto/update-album.dto';
import { CreateAlbumService } from '../core/service/create-photo.service';
import { UpdateAlbumService } from '../core/service/update-photo.service';
import { RemoveAlbumService } from '../core/service/remove-photo.service';

@Controller('albums')
export class AlbumsController {
  constructor(
    private readonly getAllAlbumsService: GetAllAlbumsService,
    private readonly findAlbumPhotosService: FindAlbumPhotosService,
    private readonly createAlbumService: CreateAlbumService,
    private readonly updateAlbumService: UpdateAlbumService,
    private readonly removeAlbumService: RemoveAlbumService,
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createAlbumDto: CreateAlbumDto,
    @GetUser() user: IUserGuard,
  ) {
    const album = await this.createAlbumService.execute(createAlbumDto, user);
    return {
      status: true,
      message: 'Álbum criado com sucesso.',
      data: album,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @GetUser() user: IUserGuard,
  ) {
    const album = await this.updateAlbumService.execute(
      +id,
      updateAlbumDto,
      user,
    );
    return {
      status: true,
      message: 'Álbum atualizado com sucesso.',
      data: album,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: IUserGuard) {
    await this.removeAlbumService.execute(+id, user);
    return {
      status: true,
      message: 'Álbum removido com sucesso.',
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
