import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { UserDoesNotExistException } from 'src/common/exceptions/UserDoesNotExistException';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  findByTelegramId(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { telegramId: id } });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  findAll() {
    return this.userRepository.find();
  }

  async create(createDto: CreateUserDto): Promise<User> {
    const { email, password, firstName, lastName, role } = createDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(password, salt);

    const user = new User({
      email,
      firstName,
      lastName,
      role,
      salt,
      password: hashedPassword,
    });

    return await user.save();
  }

  async updateProfile(
    userId: string,
    updateProfileDto: Partial<User>,
    profileImagePath?: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UserDoesNotExistException();
    }

    Object.assign(user, updateProfileDto);
    if (profileImagePath) {
      user.profileImage = profileImagePath;
    }

    return this.userRepository.save(user);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
