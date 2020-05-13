import { Controller, Req,Get, Post, Param, Body, UsePipes, Query, UseGuards } from '@nestjs/common';
import {UserService} from './../service/users.service'
import { User } from './../interface/user.interface';
import { CreateUserDto,FindUsersDto, LoginDto } from 'src/dto/users.dto';
import { SelectFields } from 'src/decorators/fields.decorator';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';

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

    // 根据id获取用户信息
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getFindByIdUser(@Param('id') id,@SelectFields() fields):Promise<User>{
        return this.usersService.findByIdUser(id,fields);
    }

    // 创建用户
    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto):Promise<User>{
        return this.usersService.createUser(CreateUserDto);
    }
}
