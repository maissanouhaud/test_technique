import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export abstract class DocumentedHttpException extends HttpException {
  @ApiProperty({ name: 'statusCode' })
  private _statusCode: number;

  @ApiProperty({ name: 'message' })
  private _message: string;
}
