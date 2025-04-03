import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { BusinessException } from '../exceptions/business.exception';
import { LoggerService } from '../services/logger.service';

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: BusinessException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const errorResponse = exception.getResponse();
    const errorCode = exception.getErrorCode();

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof errorResponse === 'object' && 'message' in errorResponse
          ? (errorResponse['message'] as string)
          : errorResponse,
      errorCode,
    };

    // log exception
    if (status >= 500) {
      this.logger.error(`${exception.message}`);
    } else {
      this.logger.warn(`${exception.message}`);
    }

    // send response
    response.status(status).json(responseBody);
  }
}
