import { Module } from '@nestjs/common';
import { TopicController } from './../controller/topic.controller';
import { DatabaseModule } from './database.module';
import { usersProviders } from 'src/providers/users.providers';
import { TopicService } from 'src/service/topic.service'
@Module({
  imports:[DatabaseModule],
  controllers: [TopicController],
  providers: [TopicService,...usersProviders],
  exports: [TopicService]
})
export class TopicModule {}