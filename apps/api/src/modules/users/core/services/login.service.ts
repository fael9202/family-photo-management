import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import CustomError from 'src/shared/utils/exceptions/custom-error';
import statusCode from 'src/shared/utils/exceptions/statusCode';
import * as bcrypt from 'bcryptjs';
import { verifySpecialChars } from 'src/shared/utils/helpers/verifySpecialChars';
import { UserRepository } from '../../persistence/user.repository';

@Injectable()
export class LoginService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  private generateToken(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30m',
    });
    return { accessToken };
  }

  async validateUserPassword(password: string, actualPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, actualPassword);
    if (!isPasswordValid) {
      throw new CustomError('Senha incorreta.', statusCode.UNAUTHORIZED);
    }
  }

  async login({ username, password }: LoginDto) {
    verifySpecialChars(username);
    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      throw new CustomError('Usuário não encontrado.', statusCode.UNAUTHORIZED);
    }

    await this.validateUserPassword(password, user.password);

    const tokenPayload = { id: user.id, name: user.name, email: user.email };
    const { accessToken } = this.generateToken(tokenPayload);

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token: accessToken,
    };
  }
}
