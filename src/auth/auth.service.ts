import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './interfaces/user.interface';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
    const { firstname, lastname, email, society, password } =
      signupCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      firstname,
      lastname,
      email,
      society,
      password: hashedPassword,
    });

    try {
      await user.save();
      //ajouter la notif slack
      //ajouter le mail de confirmation
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async validateUser(signCredentialsDto: SigninCredentialsDto): Promise<User> {
    const { email, password } = signCredentialsDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      return user;
    }
    return null;
  }

  async signIn(user: User): Promise<{ accessToken: string }> {
    const payload = { mail: user.email, id: user._id };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
