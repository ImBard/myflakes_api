import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private tokenRepository: Repository<Token>,
        private userService: UsersService,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService
    ) { }

    async save(hash: string, email: string) {
        let objToken = await this.tokenRepository.findOne({ email: email })
        
        if (objToken) {
            this.tokenRepository.update(objToken.id, {
                hash: hash
            })
        } else {
            this.tokenRepository.insert({
                hash: hash,
                email: email
            })
        }
    }

    async refreshToken(oldToken: string) {
        let objToken = await this.tokenRepository.findOne({hash: oldToken})
        if (objToken) {
            let user = await this.userService.findOneOrFail({email:objToken.email})
            return this.authService.login(user)
        } else {
            return new UnauthorizedException(MessagesHelper.TOKEN_INVALID)
        }
    }
}
