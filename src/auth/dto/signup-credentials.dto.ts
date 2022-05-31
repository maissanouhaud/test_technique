import { IsString } from "class-validator";

export class SignupCredentialsDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  email: string;

  @IsString()
  society: string;

  @IsString()
  password: string;
}
