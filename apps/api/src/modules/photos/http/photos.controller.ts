import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PhotosService } from '../core/services/photos.service';
import { CreatePhotoDto } from '../core/dto/create-photo.dto';
import { UpdatePhotoDto } from '../core/dto/update-photo.dto';
import { CreatePhotoService } from '../core/services/create-photo.service';
import { UpdatePhotoService } from '../core/services/update-photo.service';
import { RemovePhotoService } from '../core/services/remove-photo.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { GetUser } from '../../../shared/decorators/user.decorator';
import { IUserGuard } from '../../../shared/utils/interfaces/user/user-guard.interface';

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly createPhotoService: CreatePhotoService,
    private readonly updatePhotoService: UpdatePhotoService,
    private readonly removePhotoService: RemovePhotoService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPhotoDto: CreatePhotoDto) {
    const photo = await this.createPhotoService.execute(createPhotoDto);
    return {
      status: true,
      message: 'Foto criada com sucesso.',
      data: photo,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
    @GetUser() user: IUserGuard,
  ) {
    const photo = await this.updatePhotoService.execute(
      +id,
      updatePhotoDto,
      user,
    );
    return {
      status: true,
      message: 'Foto atualizada com sucesso.',
      data: photo,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: IUserGuard) {
    await this.removePhotoService.execute(+id, user);
    return {
      status: true,
      message: 'Foto removida com sucesso.',
    };
  }
}
