import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export type Users = any;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: any) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const alreadyInUse = await this.findAlreadyUsed(createUserDto.username);

    if (alreadyInUse.length > 1) {
      throw new UnauthorizedException('User already in use, choose another!');
    } else {
      return this.userRepository.save({
        id: createUserDto.id,
        username: createUserDto.username,
        password: hash,
        isActive: true,
      });
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findAlreadyUsed(username: any) {
    return this.userRepository.find({
      where: { username: username },
    });
  }

  findOne(username: any, password?: any): Promise<Users | undefined> {
    return this.userRepository.findOne({
      where: { username: username },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
