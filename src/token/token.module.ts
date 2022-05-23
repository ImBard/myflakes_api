import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/app/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { TokenController } from './token.controller';
import { Token } from './token.entity';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token]),forwardRef(() => AuthModule), UsersModule],
  controllers: [TokenController],
  providers: [TokenService, AuthService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
