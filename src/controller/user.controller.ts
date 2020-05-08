import { Controller, Req,Get, Post, Param, Body, UsePipes, Query } from '@nestjs/common';
import {UserService} from './../service/users.service'
import { Request } from 'express';
import { User } from './../interface/user.interface';
import { CreateUserDto,FindUsersDto } from 'src/dto/users.dto';
import {PaginateParseIntPipe} from './../pipes/paginate.pipe'

var a = {}
@Controller('user')
export class UserController {
    constructor(
        private usersService: UserService
    ){}

    // 分页查询用户，支持用户名称
    @Get('findUsers')
    pipe(@Query() findUsersDto: FindUsersDto):Promise<User[]>{
        return this.usersService.getFindUsers(findUsersDto);
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
