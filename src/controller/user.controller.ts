import { Controller, Req,Get, Post, Param, Body, UsePipes } from '@nestjs/common';
import {UserService} from './../service/users.service'
import { Request } from 'express';
import { User } from './../interface/user.interface';
import { CreateUserDto } from 'src/dto/users.dto';
@Controller('user')
export class UserController {
    constructor(
        private usersService: UserService
    ){}

    @Get('add')
    getAdd():string {
        return 'wqewqeqwewqeqw';
    }

    // 根据用户名称查找
    @Get('findUsers')
    getFindUsers(@Req() request: Request):Promise<User[]>{
        return this.usersService.getFindUsers(request.query);
    }

    @Get(':id')
    getFindByIdUser(@Param() params,@Req() request: Request):Promise<User>{
        return this.usersService.findByIdUser(params.id,request.query);
    }

    // 创建用户
    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto):Promise<User>{
        return this.usersService.createUser(CreateUserDto);
    }
}
