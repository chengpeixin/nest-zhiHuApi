import { Module } from '@nestjs/common';
import { UserController } from './../controller/user.controller';
import { UserService } from './../service/users.service';
import { DatabaseModule } from './database.module';
import { usersProviders } from 'src/providers/users.providers';
import { TopicModule } from './topic.module';
import { questionProviders } from 'src/providers/questions.providers';
import { QuestionModule } from './question.module';
import { AnswerService } from 'src/service/answers.service';
import { answersProviders } from 'src/providers/answers.providers';

@Module({
  imports:[DatabaseModule,TopicModule,QuestionModule],
  controllers: [UserController],
  providers: [UserService,...usersProviders,...questionProviders,...answersProviders,AnswerService],
  exports: [UserService]
})
export class UsersModule {}