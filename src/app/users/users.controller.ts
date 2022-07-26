import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { newPostDto } from './dto/newPost.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async index() {
        return await this.userService.findAll();
    }
    
    @Post()  
    async store(@Body() body: CreateUserDto) {
        return await this.userService.store(body);
    }

    @Post('post')
    @UseGuards(AuthGuard('jwt'))
    async newPost(@Body() body: newPostDto) {
        return "teste"
    }
    
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.findOneOrFail({idUser: id});
    }
    
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
        return await this.userService.update(id, body);
    }
    
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.userService.destroy(id);
    }

}
