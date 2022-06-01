import { HttpStatus } from '@nestjs/common';
import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export const SIGN_UP: ApiOperationOptions = {
  summary: `A new user has signed up`,
  description: `Save the new user in the database, with encrypted password`,
};

export const SIGN_IN: ApiOperationOptions = {
  summary: `A new user has signed in`,
  description: `Give access token to the user`,
};

export const SIGN_IN_SUCCESSFUL_RESPONSE: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: `Access Token`,
  type: String,
};

export const CONFIRM_MAIL: ApiOperationOptions = {
  summary: `The user confirm its email`,
  description: `Set the variable in the db to true`,
};
