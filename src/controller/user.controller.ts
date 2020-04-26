import { Controller, Req,Get, Post } from '@nestjs/common';
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
        return '帅';
    }

    @Post()
    createUser(@Req() request: Request):Promise<User>{
        return this.usersService.getName(request.body);
    }

}
