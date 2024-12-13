import CustomError from '../exceptions/custom-error';
import statusCode from '../exceptions/statusCode';

export function verifySpecialChars(name: string) {
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(name)) {
    throw new CustomError(
      'Nome de usuário não pode conter caracteres especiais.',
      statusCode.BAD_REQUEST,
    );
  }
}
