
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtService } from '@nestjs/jwt'
import { UserToken, User } from 'src/interface/user.interface';
import { LoginDto } from 'src/dto/users.dto';
@Injectable()
export class AuthService {
  constructor(
      private usersService: UserService,
      private jwtService: JwtService
    ) {}

  async validateUser(uname: string, pass: string): Promise<User | null> {
    const user:User = await this.usersService.findOne({name:uname},'+password')
    if (user && user.password === pass) {
      return user;
    }
    throw new UnauthorizedException({message:'账号或密码不正确'})
  }

  // 登录
  async login(userData:LoginDto):Promise<UserToken>{
    let user:User = await this.validateUser(userData.name,userData.password)
    const payLoad = {
      name:user.name,
      userId:user._id
    }
    return {
      accessToken:this.jwtService.sign(payLoad)
    }
  }

  // 修改密码
  async updatePassword(newPass, oldPass,userId):Promise<User>{
    return await this.usersService.updatePassword(newPass, oldPass,userId)
  }
}