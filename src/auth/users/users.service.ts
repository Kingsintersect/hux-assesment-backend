import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email;
    const salt = await bcrypt.genSalt();
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);

    try {
      const user_exists = await this.UserExists(email);
      if (user_exists) {
        throw new BadRequestException('User already exists with Email: ' + email);
      }

      const user = await this.userRepository.create(createUserDto);
      delete user.password;

      return user;
    } catch (err) {
      throw err
    }
  }

  async UserExists(filter: string): Promise<User | null> {
    const user = await this.userRepository.checkExistence({ filter });
    return user || null;
  }
}
