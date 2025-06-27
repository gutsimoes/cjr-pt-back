import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginRequestBody } from './dto/LoginRequestBody.dto';
import { UserToken } from './types/UserToken';
import { UserPayload } from './types/UserPayload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async login(loginRequestBody: LoginRequestBody): Promise<UserToken> {
        const user = await this.validateUser(loginRequestBody.email, loginRequestBody.senha);

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload: UserPayload = {
            email: user.email,
            sub: user.id,
        };

        const token = this.jwtService.sign(payload, {
            expiresIn: '1d',
            secret: this.configService.get<string>('JWT_SECRET'),
        });

        return {
            access_token: token,
        };
    }

    async validateUser(email: string, senha: string) {
        const user = await this.userService.findByEmail(email);

        if (user && (await bcrypt.compare(senha, user.senha))) {
            const { senha, ...result } = user;
            return result;
        }

        return null;
    }
}
