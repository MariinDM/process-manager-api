// tokens/tokens.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(Token)
        private tokenRepo: Repository<Token>,
    ) { }

    async createToken(user: User, token: string, type: 'access' | 'refresh', expiresAt: Date): Promise<Token> {
        const newToken = this.tokenRepo.create({
            token,
            type,
            expiresAt,
            user
        });

        return await this.tokenRepo.save(newToken);
    }

    async revokeToken(token: string) {
        await this.tokenRepo.update({ token }, { isRevoked: true });
    }

    async isTokenValid(token: string, type: 'access' | 'refresh') {
        const found = await this.tokenRepo.findOne({
            where: { token, type, isRevoked: false },
        });
        if (!found || found.expiresAt < new Date()) return false;
        return true;
    }
}
