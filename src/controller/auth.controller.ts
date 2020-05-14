import { Controller, UseGuards, Post, Req, Body, Patch, Param, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';
import { LoginDto } from 'src/dto/users.dto';
import { UserToken, User } from 'src/interface/user.interface';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';
import { UpdatePassDto } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    login(@Body() loginData:LoginDto):Promise<UserToken>{
        return this.authService.login(loginData);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('pass')
    updatePassword(@Body() params:UpdatePassDto,@Req() request):Promise<User>{
        const { newPass, oldPass } = params
        if (oldPass!==request.user.password){
            throw new HttpException('旧密码不正确',HttpStatus.NOT_ACCEPTABLE)
        }
        return this.authService.updatePassword(newPass, oldPass,request.user._id)
    }
}