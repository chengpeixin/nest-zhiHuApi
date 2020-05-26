import { Controller, Get, Post, Param, Body, Query, UseGuards, Delete, Req, HttpException, HttpStatus, Put, PlainLiteralObject, Patch } from '@nestjs/common';
import { UserService } from './../service/users.service'
import { User, FollowersList } from './../interface/user.interface';
import { CreateUserDto,FindUsersDto } from 'src/dto/users.dto';
import { SelectFields } from 'src/decorators/fields.decorator';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';
import { DUser } from 'src/decorators/user.decorator';
import { TopicService } from 'src/service/topic.service';
import { JwtStrategy } from 'src/module/auth/jwt.strategy';
import { CreateTopicDto, FindTopicsDto, FindTopicDto } from 'src/dto/topic.dto';
import { Topic, CreateTopic } from 'src/interface/topic.interface';
import { QuestionService } from 'src/service/question.service';
import { FindQuestionDto } from 'src/dto/question.dto';

@Controller('question')
export class QuestionController {
    constructor(private topicService:TopicService,private questionService:QuestionService){}

    @Get()
    async getQuestions(@Query() findQuestionDto:FindQuestionDto){
        return' await this.questionService.getQuestions(findQuestionDto)'
    }


}