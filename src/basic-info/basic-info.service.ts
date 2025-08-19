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

  create(createBasicInfoDto: CreateBasicInfoDto) {
    const basicInfo = this.basicInfoRepository.create(createBasicInfoDto);
    return this.basicInfoRepository.save(basicInfo);
  }

  findAll() {
    return this.basicInfoRepository.find();
  }

  findOne(id: number) {
    return this.basicInfoRepository.findOne({ where: { id } });
  }

  update(id: number, updateBasicInfoDto: UpdateBasicInfoDto) {
    return this.basicInfoRepository.update(id, updateBasicInfoDto);
  }

  remove(id: number) {
    return this.basicInfoRepository.delete(id);
  }
}
