import { HttpStatus } from '@nestjs/common';
import { DocumentedHttpException } from '../../utils/http.exception';

export class UserNotFoundException extends DocumentedHttpException {
  constructor() {
    super(
      `The user was not found, please check your email.`,
      HttpStatus.NOT_FOUND,
    );
    this.name = UserNotFoundException.name;
  }
}
