import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { usersProviders } from 'src/providers/users.providers';
import { TopicService } from 'src/service/topic.service'
import { QuestionController } from 'src/controller/question.controller';
import { QuestionService } from 'src/service/question.service';
import { questionProviders } from 'src/providers/questions.providers';
@Module({
  imports:[DatabaseModule],
  controllers: [QuestionController],
  providers: [QuestionService,...usersProviders,...questionProviders],
  exports: [QuestionService]
})
export class QuestionModule {}