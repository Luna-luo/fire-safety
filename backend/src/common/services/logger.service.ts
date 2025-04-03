import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService {
  private context?: string;

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  setContext(context: string) {
    this.context = context;
    return this;
  }

  log(message: string, ...meta: any[]) {
    this.logger.info(this.formatMessage(message), ...meta);
  }

  error(message: string, trace?: string, ...meta: any[]) {
    this.logger.error(this.formatMessage(message), {
      trace,
      ...meta,
    });
  }

  warn(message: string, ...meta: any[]) {
    this.logger.warn(this.formatMessage(message), ...meta);
  }

  debug(message: string, ...meta: any[]) {
    this.logger.debug(this.formatMessage(message), ...meta);
  }

  verbose(message: string, ...meta: any[]) {
    this.logger.verbose(this.formatMessage(message), ...meta);
  }

  private formatMessage(message: string): string {
    return this.context ? `[${this.context}] ${message}` : message;
  }
}
