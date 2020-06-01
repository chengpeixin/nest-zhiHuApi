import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './service/app.service'
import { UsersModule } from './module/user.module'
import { AuthModule } from './module/auth/auth.module'
import { TopicModule } from './module/topic.module'
import { QuestionModule } from './module/question.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import * as RavenModule from 'nest-raven'
@Module({
  imports: [UsersModule,AuthModule,TopicModule,QuestionModule],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {}
