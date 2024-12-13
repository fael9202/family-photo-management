import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { SendEmailDto } from '../core/dto/send-email.dto';
import { SendEmailService } from '../core/services/send-email.service';
import { ChangePasswordDto } from '../core/dto/change.dto';
import { ChangePasswordService } from '../core/services/change-password.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { IUserGuard } from 'src/shared/utils/interfaces/user/user-guard.interface';
import { LoginDto } from '../core/dto/login.dto';
import { LoginService } from '../core/services/login.service';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly changePasswordService: ChangePasswordService,
    private readonly loginService: LoginService,
  ) {}

  @Post('send-email')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    await this.sendEmailService.sendEmail(sendEmailDto);
    return {
      status: true,
      message: 'Email enviado com sucesso.',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: IUserGuard,
  ) {
    await this.changePasswordService.changePassword(changePasswordDto, user);
    return {
      status: true,
      message: 'Senha alterada com sucesso.',
    };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const data = await this.loginService.login(loginDto);
    return {
      status: true,
      message: 'Usuário autenticado com sucesso.',
      data,
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
