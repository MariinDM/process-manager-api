import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { TasksGateway } from './tasks-gateway/tasks-gateway.controller';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private tasksGateway: TasksGateway
  ) { }

  async findAll(status?: string, limit?: number, active?: boolean) {
    const takeLimit = limit || 10;

    const options: any = {
      take: takeLimit,
      order: { createdAt: 'DESC' },
    };

    if (status) {
      options.where = { status, active };
    }

    const tasks = await this.tasksRepository.find(options);

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
    const savedTask = await this.tasksRepository.save(task);

    this.tasksGateway.sendTaskUpdate(savedTask);

    return { message: 'Task created successfully', data: savedTask };
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.preload({
      id,
      ...updateTaskDto,
    });

    if (!task) {
      return { message: 'Task not found', data: null };
    }

    const updatedTask = await this.tasksRepository.save(task);

    this.tasksGateway.sendTaskUpdate(updatedTask);

    return { message: 'Task updated successfully', data: updatedTask };
  }

  async remove(id: number) {
    const taskResult = await this.findOne(id);
    if (!taskResult.data) {
      return { message: 'Task not found', data: null };
    }

    await this.tasksRepository.update(id, { active: false });

    this.tasksGateway.sendTaskRemoved(id);

    return { message: 'Task removed successfully', data: null };

  }
}
