import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>
    ) { }

    async findAll() {
        return await this.userRepository.find({
            select: ['idUser', 'firstName', 'lastName', 'email'],
        })
    }
    async findOneOrFail(
        conditions: FindConditions<UsersEntity>,
        options?: FindOneOptions<UsersEntity>
    ) {
        try {
            return await this.userRepository.findOneOrFail(conditions, options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    async store(data: CreateUserDto) {
        const user = this.userRepository.create(data);
        return await this.userRepository.save(user);
    }
    
    async update(id: string, data: UpdateUserDto) {
        const user = await this.findOneOrFail({ idUser: id });
        this.userRepository.merge(user, data)
        return await this.userRepository.save(user)
    }
    async destroy(id: string) {
        await this.userRepository.findOneOrFail({idUser: id});
        this.userRepository.softDelete({idUser: id})
    }
}
