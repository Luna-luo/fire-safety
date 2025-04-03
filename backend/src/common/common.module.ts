import { Module, Global } from '@nestjs/common';
import { LoggerService } from './services/logger.service';
import { BusinessExceptionFilter } from './filters/business-exception.filter';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

@Global()
@Module({
  imports: [],
  providers: [LoggerService, BusinessExceptionFilter, AllExceptionsFilter],
  exports: [LoggerService, BusinessExceptionFilter, AllExceptionsFilter],
})
export class CommonModule {}
