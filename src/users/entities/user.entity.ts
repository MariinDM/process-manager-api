import { BasicInfo } from "src/basic-info/entities/basic-info.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Token } from "src/tokens/entities/token.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    @OneToMany(() => Token, token => token.user)
    tokens: Token[];

    @ManyToMany(() => Task, task => task.users, {
        cascade: true,
    })
    tasks: Task[];

    @OneToOne(() => BasicInfo, basicInfo => basicInfo.user, {
        cascade: true,
        eager: true
    })
    basicInfo: BasicInfo;
}
