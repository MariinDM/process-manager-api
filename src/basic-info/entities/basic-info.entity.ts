import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export interface EducationInfo {
    degree: string;
    institution: string;
    dateStarted?: Date;
    dateEnded?: Date;
    present?: boolean;
}

export interface WorkInfo {
    position: string;
    company: string;
    dateStarted?: Date;
    dateEnded?: Date;
    present?: boolean;
}

@Entity()
export class BasicInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @Column()
    location: string;

    @Column()
    birthdate: Date;

    @Column()
    summary: string;

    @Column()
    website: string;

    @Column()
    github: string;

    @Column()
    linkedin: string;

    @Column('jsonb')
    work: WorkInfo[];

    @Column('jsonb')
    education: EducationInfo[];

    @Column('text', { array: true })
    skills: string[];

    @OneToOne(() => User, user => user.basicInfo)
    @JoinColumn()
    user: User;
}
