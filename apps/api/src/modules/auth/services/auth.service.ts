import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/shared/config/database';
import { TokenDTO } from 'src/shared/dto/token.dto';
import { IUserGuard } from 'src/shared/utils/interfaces/user/user-guard.interface';

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}

  async validateUser(payload: TokenDTO): Promise<IUserGuard> {
    const user = await this.databaseService.user.findUnique({
      where: { id: payload.id, name: payload.name, email: payload.email },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
      },
    });
    if (!user) {
      throw new HttpException(
        { status: false, message: 'Usuário não encontrado.' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user as IUserGuard;
  }
}
