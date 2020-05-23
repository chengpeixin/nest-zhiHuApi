import { Module } from '@nestjs/common';
import { UserController } from './../controller/user.controller';
import { UserService } from './../service/users.service';
import { DatabaseModule } from './database.module';
import { usersProviders } from 'src/providers/users.providers';
import { TopicModule } from './topic.module';

@Module({
  imports:[DatabaseModule,TopicModule],
  controllers: [UserController],
  providers: [UserService,...usersProviders],
  exports: [UserService]
})
export class UsersModule {}