import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import {UsersModule} from './module/user.module'
@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
