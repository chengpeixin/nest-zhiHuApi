import { Controller, UseGuards, Post, Req, Body } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';
import { LoginDto } from 'src/dto/users.dto';
import { UserToken } from 'src/interface/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    login(@Body() loginData:LoginDto):Promise<UserToken>{
        return this.authService.login(loginData);
    }
}