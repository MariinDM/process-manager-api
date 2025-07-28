import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private tokensService: TokensService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        throw new UnauthorizedException('Credenciales inválidas');
    }

    async register(data: { username: string; email: string; password: string }) {
        const user = await this.usersService.create(data);
        return this.generateTokens(user);
    }

    async generateTokens(user: User | any) {
        const payload = { email: user.email, sub: user.id };

        const accessToken = this.jwtService.sign(payload, {
            secret: 'ACCESS_SECRET',
            expiresIn: '8h',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: 'REFRESH_SECRET',
            expiresIn: '3d',
        });

        const now = new Date();

        await this.tokensService.createToken(
            user,
            refreshToken,
            'refresh',
            new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        );

        return {
            message: 'Inicio de sesión exitoso',
            token: {
                accessToken,
                refreshToken,
            }
        };
    }

    async refresh(refreshToken: string) {
        const isValid = await this.tokensService.isTokenValid(refreshToken, 'refresh');
        if (!isValid) throw new UnauthorizedException('Refresh token inválido o expirado');

        const payload = this.jwtService.verify(refreshToken, { secret: 'REFRESH_SECRET' });
        const user = await this.usersService.findOne(payload.sub);

        await this.tokensService.revokeToken(refreshToken);

        return this.generateTokens(user);
    }

    async logout(refreshToken: string) {
        await this.tokensService.revokeToken(refreshToken);
        return { message: 'Sesión cerrada' };
    }
}
