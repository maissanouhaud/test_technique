import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';
import { User } from './interfaces/user.interface';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CONFIRM_MAIL,
  SIGN_IN,
  SIGN_IN_SUCCESSFUL_RESPONSE,
  SIGN_UP,
} from './auth.documentation';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation(SIGN_UP)
  async signUp(
    @Body(ValidationPipe) signupCredentials: SignupCredentialsDto,
  ): Promise<User> {
    return await this.authService.signUp(signupCredentials);
  }

  @Post('/signin')
  @ApiOperation(SIGN_IN)
  @ApiResponse(SIGN_IN_SUCCESSFUL_RESPONSE)
  async signIn(
    @Body(ValidationPipe) signinCredentials: SigninCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user: User = await this.authService.validateUser(signinCredentials);
    return await this.authService.signIn(user);
  }

  @Get('/confirm/:email')
  @ApiOperation(CONFIRM_MAIL)
  async confirmMail(@Param('email') email: string): Promise<void> {
    return await this.authService.confirmMail(email);
  }
}
