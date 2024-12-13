import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dto/send-email.dto';
import { SendEmailEvent } from 'src/shared/notification/emailNotification/events/send-email.event';
import { EmailNotificationEmitter } from '../events/email-notification-emitter';
import { UserRepository } from '../../persistence/user.repository';
import { JwtService } from '@nestjs/jwt';
import { EmailEvent } from 'src/shared/utils/enums/events.enum';

@Injectable()
export class SendEmailService {
  constructor(
    private emailNotificationEmitter: EmailNotificationEmitter,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    // enviar email

    const user = await this.userRepository.findFirst();

    if (!user) {
      throw new HttpException(
        { status: false, message: 'Usuário não encontrado' },
        HttpStatus.NOT_FOUND,
      );
    }

    const jwtToken = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
      { secret: process.env.JWT_SECRET, expiresIn: '10m' },
    );

    await this.emailNotificationEmitter.emitEvent(
      EmailEvent.passwordRecovery,
      new SendEmailEvent({
        userEmail: sendEmailDto.email,
        token: jwtToken,
      }),
    );
  }
}
