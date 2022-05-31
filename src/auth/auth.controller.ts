import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';
import { User } from './interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) singupCredentials: SignupCredentialsDto,
  ): Promise<void> {
    return await this.authService.signUp(singupCredentials);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) signinCredentials: SigninCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user: User = await this.authService.validateUser(signinCredentials);
    return await this.authService.signIn(user);
  }
}
