import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { UsersModule } from './module/user.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [UsersModule,AuthModule],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {}
