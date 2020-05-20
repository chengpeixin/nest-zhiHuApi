import { Controller, UseGuards, Post, Req, Body, Patch, Param, NotAcceptableException, HttpException, HttpStatus, UnauthorizedException, Delete } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';
import { LoginDto } from 'src/dto/users.dto';
import { UserToken, User } from 'src/interface/user.interface';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';
import { UpdatePassDto } from 'src/dto/auth.dto';
import { CacheService } from 'src/service/cache.service';
import { DUser } from 'src/decorators/user.decorator';
import { tokenEx } from 'config'
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService,private cacheService:CacheService){}

    @Post('login')
    async login(@Body() loginData:LoginDto):Promise<UserToken>{
        const {name,_id}:User = await this.validateUser(loginData.name,loginData.password)
        const payLoad = {
            name:name,
            userId:_id
        }
        const jwt = this.authService.setJwt(payLoad)
        await this.cacheService.set(_id.toString(),jwt,tokenEx)
        return {
            accessToken:jwt
        }
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

    @UseGuards(JwtAuthGuard)
    @Delete('logout')
    async logOut(@DUser() user:User){
        await this.cacheService.remove(user._id)
        return Object.create(null)
    }

    // 验证用户
    async validateUser(uname: string, pass: string): Promise<User | null> {
        const user:User = await this.authService.findUser(uname)
        if (user && user.password === pass) {
          return user;
        }
        throw new UnauthorizedException({message:'账号或密码不正确'})
    }
}