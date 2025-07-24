import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
}
