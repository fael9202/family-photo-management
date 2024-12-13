import { HttpException } from '@nestjs/common';
import CustomError from './custom-error';

export class ErrorException extends HttpException {
  // a estrutura do error deve ser { status: boolean, message: string, error: any }
  constructor(error: CustomError) {
    const { message, statusCode } = error;
    super({ status: false, message: message }, statusCode || 500);
  }
}
