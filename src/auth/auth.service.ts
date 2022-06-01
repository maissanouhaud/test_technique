import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './interfaces/user.interface';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { SlackService } from '../utils/slack/slack.service';
import { SignupException } from './exceptions/signup.exception';
import { WrongPasswordException } from './exceptions/wrongpassword.exception';
import { NotConfirmedException } from './exceptions/notconfirmed.exception';
import { UserNotFoundException } from './exceptions/usernotfound.exception';
import { MailService } from '../utils/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    private jwtService: JwtService,
    private slackService: SlackService,
    private mailService: MailService,
  ) {}

  async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<User> {
    const { firstname, lastname, email, society, password } =
      signupCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      firstname,
      lastname,
      email,
      society,
      password: hashedPassword,
      has_confirmed: false,
      confirmed_at: null,
    });

    try {
      await user.save();
      await this.slackService.signUpSlackNotif(signupCredentialsDto);
      await this.mailService.sendUserConfirmation(user);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      console.log(error);
      throw new SignupException();
    }
    return user;
  }

  async validateUser(
    signInCredentialsDto: SigninCredentialsDto,
  ): Promise<User> {
    const { email, password } = signInCredentialsDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UserNotFoundException();
    }
    if (!user.has_confirmed) {
      throw new NotConfirmedException();
    }
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      return user;
    }
    throw new WrongPasswordException();
  }

  async signIn(user: User): Promise<{ accessToken: string }> {
    const payload = { mail: user.email, id: user._id };

    await this.slackService.signInSlackNotif(user.email);
    return { accessToken: this.jwtService.sign(payload) };
  }

  async confirmMail(email: string): Promise<void> {
    let updated;
    try {
      updated = await this.userModel.updateOne(
        { email },
        { $set: { has_confirmed: true } },
      );
    } catch (e) {
      console.log(e);
      return e;
    }
    return updated;
  }
}
