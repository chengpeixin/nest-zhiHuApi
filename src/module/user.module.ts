import { Module } from '@nestjs/common';
import { UserController } from './../controller/user.controller';
import { UserService } from './../service/users.service';
import { DatabaseModule } from './database.module';
import { usersProviders } from 'src/providers/users.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [UserController],
  providers: [UserService,...usersProviders],
  exports: [UserService]
})
export class UsersModule {}