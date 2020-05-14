import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { jwtConstants } from './constants'
import { UserService } from 'src/service/users.service'
import { User } from 'src/interface/user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // passReqToCallback:true,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload,done:VerifiedCallback):Promise<User> {
    const { userId } = payload
    const user:User = await this.userService.findOneByUserId(userId)
    if (user){
      return user
    }else {
      throw new UnauthorizedException({
        message:'用户授权失败'
      })
    }
  }
}