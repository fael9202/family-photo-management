import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhotosService } from '../core/services/photos.service';
import { CreatePhotoDto } from '../core/dto/create-photo.dto';
import { UpdatePhotoDto } from '../core/dto/update-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  // @Post()
  // create(@Body() createPhotoDto: CreatePhotoDto) {
  //   return this.photosService.create(createPhotoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.photosService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.photosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
  //   return this.photosService.update(+id, updatePhotoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.photosService.remove(+id);
  // }
}
