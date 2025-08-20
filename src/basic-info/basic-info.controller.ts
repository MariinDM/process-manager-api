import { Controller, Get, Post, Body, Param, Delete, Put, Request } from '@nestjs/common';
import { BasicInfoService } from './basic-info.service';
import { CreateBasicInfoDto } from './dto/create-basic-info.dto';
import { UpdateBasicInfoDto } from './dto/update-basic-info.dto';
import { User } from 'src/decorators/user.decorator';
import { use } from 'passport';

@Controller('api/basic-info')
export class BasicInfoController {
  constructor(private readonly basicInfoService: BasicInfoService) { }

  @Post()
  create(@Body() createBasicInfoDto: CreateBasicInfoDto) {
    return this.basicInfoService.create(createBasicInfoDto);
  }

  @Get()
  findAll() {
    return this.basicInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basicInfoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBasicInfoDto: UpdateBasicInfoDto) {
    return this.basicInfoService.update(+id, updateBasicInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basicInfoService.remove(+id);
  }
}
