import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    private readonly errorCode?: string,
  ) {
    super(
      {
        message,
        errorCode,
        statusCode,
      },
      statusCode,
    );
  }

  getErrorCode(): string | undefined {
    return this.errorCode;
  }
}
