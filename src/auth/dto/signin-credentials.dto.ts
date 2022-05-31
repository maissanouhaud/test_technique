import { IsString } from "class-validator";

export class SigninCredentialsDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
