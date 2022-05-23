import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
require('dotenv').config()
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => TokenService))
        private tokenService: TokenService
    ) { }

    async login(user: UsersEntity) {
        const payload = { sub: user.idUser, email: user.email }
        const token = this.jwtService.sign(payload) // problema esta aqui!!!
        this.tokenService.save(token, user.email)
        return {
            token: token
        }
    }

    async validateUser(email: string, password: string) {
        let user: UsersEntity;
        try {
            user = await this.userService.findOneOrFail({ email })
        } catch (error) {
            return null;
        }

        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    }
}
