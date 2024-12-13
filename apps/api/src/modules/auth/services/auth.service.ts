import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/shared/config/database';
import { TokenDTO } from 'src/shared/dto/token.dto';

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}

  async validateUser(payload: TokenDTO): Promise<JwtAuthGuardPayload> {
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
    return user as JwtAuthGuardPayload;
  }
}

export interface JwtAuthGuardPayload {
  id: number;
  name: string;
  email: string;
  username: string;
}
