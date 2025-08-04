import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) { }

  async findAll() {
    const users = await this.usersRepository.find();
    if (!users || users.length === 0) {
      return { message: 'No users found', data: [] };
    }
    return { message: 'Users retrieved successfully', data: users };
  }

  async findOne(id: number) {

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      return { message: 'User not found', data: null };
    }

    return { message: 'User retrieved successfully', data: user };
  }

  async findByEmail(email: string) {

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      return null;
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {

    const existsEmail = await this.findByEmail(createUserDto.email);
    const existsUsername = await this.findByUsername(createUserDto.username);

    if (existsEmail || existsUsername) {
      throw new ConflictException('El email o username ya están registrados');
    }

    const user = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);

    return { message: 'User created successfully', data: null };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const userResponse = await this.findOne(id);
    if (!userResponse.data) {
      return { message: 'User not found', data: null };
    }

    const currentUser = userResponse.data;

    if (updateUserDto.email && updateUserDto.email !== currentUser.email) {
      const existsEmail = await this.findByEmail(updateUserDto.email);
      if (existsEmail) {
        throw new ConflictException('El email ya está registrado');
      }
    }

    if (updateUserDto.username && updateUserDto.username !== currentUser.username) {
      const existsUsername = await this.findByUsername(updateUserDto.username);
      if (existsUsername) {
        throw new ConflictException('El username ya está registrado');
      }
    }

    await this.usersRepository.update(id, updateUserDto);
    return { message: 'User updated successfully', data: null };
  }

  async remove(id: number) {

    const user = await this.findOne(id);
    if (!user) {
      return { message: 'User not found', data: null };
    }

    await this.usersRepository.update(id, { active: false });
    return { message: 'User removed successfully', data: null };
  }

}
