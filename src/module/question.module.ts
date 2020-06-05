import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { usersProviders } from 'src/providers/users.providers';
import { QuestionController } from 'src/controller/question.controller';
import { QuestionService } from 'src/service/question.service';
import { questionProviders } from 'src/providers/questions.providers';
import { AnswerService } from 'src/service/answers.service';
import { answersProviders } from 'src/providers/answers.providers';
@Module({
  imports:[DatabaseModule],
  controllers: [QuestionController],
  providers: [QuestionService,...usersProviders,...questionProviders,...answersProviders,AnswerService],
  exports: [QuestionService]
})
export class QuestionModule {}