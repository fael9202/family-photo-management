import { Controller, Post, Body } from '@nestjs/common';
import { SendEmailDto } from '../core/dto/send-email.dto';
import { SendEmailService } from '../core/services/send-email.service';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @Post('send-email')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    await this.sendEmailService.sendEmail(sendEmailDto);
    return {
      status: true,
      message: 'Email enviado com sucesso.',
    };
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
