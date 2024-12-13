import { Injectable } from '@nestjs/common';
import { ChangePasswordDto } from '../dto/change.dto';

@Injectable()
export class ChangePasswordService {
  async changePassword(changePasswordDto: ChangePasswordDto) {
    // alterar senha
  }
}
