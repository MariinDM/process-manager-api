import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.generateTokens(user);
    }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    @Post('refresh')
    async refresh(@Body() body: { refresh_token: string }) {
        return this.authService.refresh(body.refresh_token);
    }

    @Post('logout')
    async logout(@Body() body: { refresh_token: string }) {
        return this.authService.logout(body.refresh_token);
    }
}
