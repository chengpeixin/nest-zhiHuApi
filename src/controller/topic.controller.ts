import { Controller, Get, Post, Param, Body, Query, UseGuards, Delete, Req, HttpException, HttpStatus, Put, PlainLiteralObject } from '@nestjs/common';
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

@Controller('topic')
export class TopicController {
    constructor(private topicService:TopicService){}


    // 创建话题
    @UseGuards(JwtAuthGuard)
    @Post()
    async topic(@Body() param:CreateTopicDto):Promise<CreateTopic>{
        return {
            topic:await this.topicService.createTopic(param)
        } 
    }

    // 分页查找话题
    @Get('topics')
    async findTopics(@Query() findTopicsDto: FindTopicsDto):Promise<Topic[]>{
        return this.topicService.findTopics(findTopicsDto)
    }

    // 查询单个话题
    @Get(':topicId')
    async findTopic(@Param() findTopicDto:FindTopicDto):Promise<CreateTopic>{
        const result:Topic = await this.topicService.findTopicById(findTopicDto.topicId)
        return {
            topic:result
        }
    }
}