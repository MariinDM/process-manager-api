import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthLogin } from './dto/auth.validator';
import { Public } from 'src/decorators/public.decorator';

@Controller('api/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Public()
    @Post('login')
    async login(@Body() body: AuthLogin) {
        const user = await this.authService.validateUser(body);
        return await this.authService.generateTokens(user);
    }

    @Public()
    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return await this.authService.register(body);
    }

    @Post('refresh')
    async refresh(@Body() body: { refresh_token: string }) {
        return await this.authService.refresh(body.refresh_token);
    }

    @Post('logout')
    async logout(@Body() body: { refresh_token: string }) {
        return await this.authService.logout(body.refresh_token);
    }
}
