import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  create(createUserDto: any) {
    return this.userRepository.save({
      id: createUserDto.id,
      username: createUserDto.username,
      password: createUserDto.password,
      isActive: true,
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(username: any): Promise<Users | undefined> {
    return this.userRepository.findOne(username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
