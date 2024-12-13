import { HttpException } from '@nestjs/common';
import CustomError from './custom-error';

export class ErrorException extends HttpException {
  constructor(error: CustomError) {
    super({ ...error }, error.statusCode || 500);
  }
}
