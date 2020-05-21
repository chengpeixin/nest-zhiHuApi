import { Controller, Get, Post, Param, Body, Query, UseGuards, Delete, Req, HttpException, HttpStatus, Put, PlainLiteralObject } from '@nestjs/common';
import { UserService } from './../service/users.service'
import { User, FollowersList } from './../interface/user.interface';
import { CreateUserDto,FindUsersDto } from 'src/dto/users.dto';
import { SelectFields } from 'src/decorators/fields.decorator';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';
import { DUser } from 'src/decorators/user.decorator';

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

    // 注销账号
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:userId')
    cancellationUser(@Req() req:any,@Param('userId') userId):Promise<any>{
        const user = req.user || {}
        if (userId !== user._id.toString()) {
            throw new HttpException('当前用户和注销用户不匹配',HttpStatus.NOT_FOUND)
        }
        return this.usersService.deleteUser(userId)
    }

    // 创建用户
    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto):Promise<User>{
        return this.usersService.createUser(CreateUserDto);
    }

    // 关注
    @UseGuards(JwtAuthGuard)
    @Put('following/:id')
    async followTopic(@Param('id') userId:string,@DUser() user:User):Promise<any>{
        return await this.usersService.followTopic(userId,user._id)
    }
    // 取消关注
    @UseGuards(JwtAuthGuard)
    @Delete('following/:id')
    async unfollowTopic(@Param('id') userId:string,@DUser() user:User){
        return await this.usersService.unfollowTopic(userId,user._id)
    }

    // 查看关注列表
    @UseGuards(JwtAuthGuard)
    @Get(':id/followers')
    async listFollowers(@Param('id') id:string):Promise<FollowersList>{
        return {
            followers:await this.usersService.listFollowers(id)
        }
    }
}