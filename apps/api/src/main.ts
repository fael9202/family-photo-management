import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CustomValidationPipe from './shared/utils/exceptions/validation-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Pipes
  app.useGlobalPipes(CustomValidationPipe);

  await app.listen(4000);
}
bootstrap();
