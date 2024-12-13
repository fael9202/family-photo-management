export default class CustomError {
  message: string[] | string;
  statusCode: number;
  constructor(message: string[] | string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
