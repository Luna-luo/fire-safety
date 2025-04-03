import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../services/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // handle http status code and message
    let httpStatus: number;
    let message: string;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const errorResponse = exception.getResponse();
      message =
        typeof errorResponse === 'object' && 'message' in errorResponse
          ? (errorResponse['message'] as string)
          : exception.message;
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    // build resonse body
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    // log exception
    if (httpStatus >= 500) {
      this.logger.error(`${message}`);
    } else {
      this.logger.warn(`${message}`);
    }

    // send response
    response.status(httpStatus).json(responseBody);
  }
}
