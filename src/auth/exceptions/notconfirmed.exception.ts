import { HttpStatus } from '@nestjs/common';
import { DocumentedHttpException } from '../../utils/http.exception';

export class NotConfirmedException extends DocumentedHttpException {
  constructor() {
    super(`Please confirm your email.`, HttpStatus.UNAUTHORIZED);
    this.name = NotConfirmedException.name;
  }
}
