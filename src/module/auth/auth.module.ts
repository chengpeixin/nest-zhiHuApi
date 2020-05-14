
import { Module } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { UsersModule } from '../user.module';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/controller/auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
      UsersModule,
      PassportModule.register({
        defaultStrategy:'jwt'
      }),
      JwtModule.register({
          secret:jwtConstants.secret,
          signOptions: { expiresIn: '1h' }
      })
  ],
  controllers:[AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
