import { HttpStatus } from '@nestjs/common';
import { DocumentedHttpException } from '../http.exception';

export class SlackException extends DocumentedHttpException {
  constructor() {
    super(
      `The Slack Notification could not be published.`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.name = SlackException.name;
  }
}
