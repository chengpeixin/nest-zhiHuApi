import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { jwtConstants } from './constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback:true,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: any,done:VerifiedCallback) {
    return { userId: payload.userId, username: payload.name };
  }
}