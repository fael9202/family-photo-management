import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CustomValidationPipe from './shared/utils/exceptions/validation-exception';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  };
  app.enableCors(corsOptions);

  // Pipes
  app.useGlobalPipes(CustomValidationPipe);

  await app.listen(4000);
}
bootstrap();
