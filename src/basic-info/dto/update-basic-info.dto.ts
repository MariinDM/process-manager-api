import { PartialType } from '@nestjs/mapped-types';
import { CreateBasicInfoDto } from './create-basic-info.dto';

export class UpdateBasicInfoDto extends PartialType(CreateBasicInfoDto) {}
