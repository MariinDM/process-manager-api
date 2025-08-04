import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>
  ) { }

  async findAll() {

    const tasks = await this.tasksRepository.find();
    if (!tasks || tasks.length === 0) {
      return { message: 'No tasks found', data: [] };
    }

    return { message: 'Tasks retrieved successfully', data: tasks };
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      return { message: 'Task not found', data: null };
    }
    return { message: 'Task retrieved successfully', data: task };
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);
    await this.tasksRepository.save(task);
    return { message: 'Task created successfully', data: null };
  }
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.preload({
      id,
      ...updateTaskDto,
    });

    if (!task) {
      return { message: 'Task not found', data: null };
    }

    await this.tasksRepository.save(task);
    return { message: 'Task updated successfully', data: task };
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    if (!task) {
      return { message: 'Task not found', data: null };
    }

    await this.tasksRepository.update(id, { active: false });
    return { message: 'Task removed successfully', data: null };

  }
}
