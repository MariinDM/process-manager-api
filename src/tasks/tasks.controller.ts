import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);
    return {
      message: 'Task created successfully',
      data: null,
    }
  }

  @Get()
  async findAll() {
    const tasks = await this.tasksService.findAll();
    return {
      message: 'Tasks retrieved successfully',
      data: tasks,
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(+id);
    if (!task) {
      return {
        message: 'Task not found',
        data: null,
      };
    }
    return {
      message: 'Task retrieved successfully',
      data: task,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.tasksService.update(+id, updateTaskDto);
    if (!updatedTask) {
      return {
        message: 'Task not found',
        data: null,
      };
    }
    return {
      message: 'Task updated successfully',
      data: updatedTask,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.tasksService.remove(+id);
    if (!deleted) {
      return {
        message: 'Task not found',
        data: null,
      };
    }
    return {
      message: 'Task deleted successfully',
      data: deleted,
    };
  }
}
