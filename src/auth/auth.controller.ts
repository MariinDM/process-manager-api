import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthLogin, AuthRegister } from './dto/auth.validator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() singDto: AuthLogin) {
        // return this.authService.login(singDto.email, singDto.password);
    }

    @Post('register')
    register(@Body() body: AuthRegister) {
        // return this.authService.register(body.email, body.password);
    }

}
