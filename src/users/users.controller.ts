import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return { message: 'Users retrieved successfully', data: users };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      return { message: 'User not found', data: null };
    }
    return { message: 'User retrieved successfully', data: user };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return { message: 'User created successfully', data: null };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    const user = await this.usersService.findOne(+id);
    if (!user) {
      return { message: 'User not found', data: null };
    }

    await this.usersService.update(+id, updateUserDto);
    return { message: 'User updated successfully', data: null };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {

    const user = await this.usersService.findOne(+id);
    if (!user) {
      return { message: 'User not found', data: null };
    }

    await this.usersService.remove(+id);
    return { message: 'User removed successfully', data: null };
  }
}
