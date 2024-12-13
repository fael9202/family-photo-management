import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ChangePasswordDto } from '../dto/change.dto';
import { IUserGuard } from 'src/shared/utils/interfaces/user/user-guard.interface';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../persistence/user.repository';

@Injectable()
export class ChangePasswordService {
  private readonly logger = new Logger(ChangePasswordService.name);
  constructor(private userRepository: UserRepository) {}

  async changePassword(changePasswordDto: ChangePasswordDto, user: IUserGuard) {
    if (changePasswordDto.password !== changePasswordDto.password) {
      throw new HttpException(
        { status: false, message: 'As senhas não são iguais.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPassword = await bcrypt.hash(changePasswordDto.password, 10);
    await this.saveNewPassword(user, newPassword);
  }

  private async saveNewPassword(user: IUserGuard, newPassword: string) {
    try {
      await this.userRepository.updatePassword(user.id, newPassword);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        { status: false, message: 'Erro ao atualizar a senha.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
