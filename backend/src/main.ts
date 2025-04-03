import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './logger/logger.config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { BusinessExceptionFilter } from './common/filters/business-exception.filter';
import * as fs from 'fs';
import { LoggerService } from './common/services/logger.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // ensure log directory exists
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }

  // create app instance
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig),
  });

  // get logger service instance
  const logger = await app.get(LoggerService);
  logger.setContext('Bootstrap');

  // global exception filter, business exception filter should be before all exceptions filter
  // the filter handle order is same as the order of the filters registered
  app.useGlobalFilters(new BusinessExceptionFilter(logger), new AllExceptionsFilter(logger));

  app.enableCors({
    origin: ['http://localhost:5173', 'https://fire-safety.mytool.life'],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  // global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );
  // start service
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Application failed to start', err);
  process.exit(1);
});
