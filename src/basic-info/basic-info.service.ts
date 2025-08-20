import { Injectable } from '@nestjs/common';
import { CreateBasicInfoDto } from './dto/create-basic-info.dto';
import { UpdateBasicInfoDto } from './dto/update-basic-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicInfo } from './entities/basic-info.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class BasicInfoService {

  constructor(
    @InjectRepository(BasicInfo) private basicInfoRepository: Repository<BasicInfo>
  ) { }

  async create(createBasicInfoDto: CreateBasicInfoDto) {
    const basicInfo = this.basicInfoRepository.create(createBasicInfoDto);
    return await this.basicInfoRepository.save(basicInfo);
  }

  async findAll() {
    return await this.basicInfoRepository.find();
  }

  async findOne(id: number) {
    return await this.basicInfoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBasicInfoDto: UpdateBasicInfoDto) {
    return await this.basicInfoRepository.update(id, updateBasicInfoDto);
  }

  async remove(id: number) {
    return await this.basicInfoRepository.delete(id);
  }
}
