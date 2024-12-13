import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Get,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { IUserGuard } from 'src/shared/utils/interfaces/user/user-guard.interface';
import { GetAllAlbumsService } from '../core/service/get-all-albums.service';
import { AlbumsQueryDto } from '../core/dto/albums.query.dto';

// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly getAllAlbumsService: GetAllAlbumsService) {}

  @Get()
  async getAllAlbums(@Query() query: AlbumsQueryDto) {
    const data = await this.getAllAlbumsService.execute(query);
    return {
      status: true,
      message: 'Álbuns encontrados com sucesso.',
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
