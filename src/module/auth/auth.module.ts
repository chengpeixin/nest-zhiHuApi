
import { Module } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { UsersModule } from '../user.module';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/controller/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { RedisModule } from 'nestjs-redis'
import { redisOpts } from 'config';
import { CacheService } from 'src/service/cache.service'
@Module({
  imports: [
      UsersModule,
      RedisModule.register(redisOpts),
      PassportModule.register({
        defaultStrategy:'jwt'
      }),
      JwtModule.register({
          secret:jwtConstants.secret,
          signOptions: { expiresIn: '1h' }
      })
  ],
  controllers:[AuthController],
  providers: [AuthService,CacheService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
