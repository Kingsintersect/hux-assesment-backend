import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from './users/schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Injectable()
export class AuthService {
  protected readonly logger: Logger

  constructor(private userService: UsersService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException("user unauthorized");
  }

  async signInUser(user: User): Promise<{ access_token }> {
    const payload = { email: user.email, id: user._id }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUpUser(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
}
