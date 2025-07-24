import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    // async login(email: string, password: string): Promise<{ accessToken: string }> {
    //     const user = await this.usersService.findOne(email);
    //     if (!user || user.password !== password) {
    //         throw new Error('Invalid credentials');
    //     }
    //     const payload = { email: user.email, sub: user.id };
    //     return {
    //         accessToken: this.jwtService.sign(payload),
    //     };
    // }

    async register(user: CreateUserDto) {
        return await this.usersService.create(user)
    }
}
