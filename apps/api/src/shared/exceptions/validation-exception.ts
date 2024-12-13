// validation-exception.helper.ts
import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function ValidationException(errors: ValidationError[]) {
  const result = errors.map((error: ValidationError) => {
    const errorMessage = error.constraints
      ? error.constraints[Object.keys(error.constraints)[0]]
      : 'Falha de validação';

    const childrenError =
      error.children &&
      error.children.length > 0 &&
      error.children[0].constraints
        ? { children: error.children[0].constraints }
        : {};

    return {
      property: error.property,
      message: errorMessage,
      ...childrenError,
    };
  });
  return new BadRequestException({
    status: false,
    message: 'Falha de validação',
    errors: result,
  });
}
