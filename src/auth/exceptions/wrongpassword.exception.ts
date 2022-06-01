import { HttpStatus } from '@nestjs/common';
import { DocumentedHttpException } from '../../utils/http.exception';

export class WrongPasswordException extends DocumentedHttpException {
    constructor() {
        super(`Wrong password, please try again.`, HttpStatus.UNAUTHORIZED);
        this.name = WrongPasswordException.name;
    }
}
