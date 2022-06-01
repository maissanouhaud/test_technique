import { HttpStatus } from '@nestjs/common';
import { DocumentedHttpException } from '../../utils/http.exception';

export class SignupException extends DocumentedHttpException {
  constructor() {
    super(`The user could not sign up`, HttpStatus.INTERNAL_SERVER_ERROR);
    this.name = SignupException.name;
  }
}
