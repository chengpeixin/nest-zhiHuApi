import { Controller, Req,Get, Post, Param } from '@nestjs/common';
import {UserService} from './../service/users.service'
import { Request } from 'express';
import { User } from './../interface/user.interface';

@Controller('user')
export class UserController {
    constructor(
        private usersService: UserService
    ){}

    @Get('add')
    getAdd():string {
        console.log(123)
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
    createUser(@Req() request: Request):Promise<User>{
        return this.usersService.createUser(request.body);
    }
}
