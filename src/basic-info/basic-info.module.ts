import { Module } from '@nestjs/common';
import { BasicInfoService } from './basic-info.service';
import { BasicInfoController } from './basic-info.controller';
import { BasicInfo } from './entities/basic-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([BasicInfo])],
  exports: [BasicInfoService],
  controllers: [BasicInfoController],
  providers: [BasicInfoService],
})
export class BasicInfoModule { }
