import { IsEmpty, IsOptional, IsString } from "class-validator";
import { EducationInfo, WorkInfo } from "../entities/basic-info.entity";

export class CreateBasicInfoDto {

    @IsString()
    @IsEmpty()
    @IsOptional()
    gender: string;

    @IsString()
    @IsEmpty()
    @IsOptional()
    location: string;

    @IsString()
    @IsEmpty()
    @IsOptional()
    birthdate: Date;

    @IsString()
    @IsEmpty()
    @IsOptional()
    summary: string;

    @IsString()
    @IsEmpty()
    @IsOptional()
    website: string;

    @IsString()
    @IsEmpty()
    @IsOptional()
    github: string;

    @IsString()
    @IsEmpty()
    @IsOptional()
    linkedin: string;

    @IsString()
    @IsEmpty()
    @IsOptional()
    work: WorkInfo[];

    @IsString()
    @IsEmpty()
    @IsOptional()
    education: EducationInfo[];

    @IsString()
    @IsEmpty()
    @IsOptional()
    skills: string[];

}
