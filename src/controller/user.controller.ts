import { Controller, Get, Post, Param, Body, Query, UseGuards, Delete, Req, HttpException, HttpStatus, Put, PlainLiteralObject } from '@nestjs/common';
import { UserService } from './../service/users.service'
import { User, FollowersList } from './../interface/user.interface';
import { CreateUserDto,FindUsersDto } from 'src/dto/users.dto';
import { SelectFields } from 'src/decorators/fields.decorator';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';
import { DUser } from 'src/decorators/user.decorator';
import { FollowTopicDto } from 'src/dto/topic.dto';
import { TopicService } from 'src/service/topic.service';
import { AnswerService } from 'src/service/answers.service';

@Controller('user')
export class UserController {
    constructor(
        private usersService: UserService,
        private topicService:TopicService,
        private answerService:AnswerService
    ){}

    // 分页查询用户，支持用户名称
    @Get('findUsers')
    pipe(@Query() findUsersDto: FindUsersDto):Promise<User[]>{
        return this.usersService.getFindUsers(findUsersDto);
    }

    // 根据id获取用户信息
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getFindByIdUser(@Param('id') id,@SelectFields() fields):Promise<User>{
        return this.usersService.findByIdUser(id,fields);
    }

    // 注销账号
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:userId')
    cancellationUser(@Req() req:any,@Param('userId') userId):Promise<any>{
        const user = req.user || {}
        if (userId !== user._id.toString()) {
            throw new HttpException('当前用户和注销用户不匹配',HttpStatus.NOT_FOUND)
        }
        return this.usersService.deleteUser(userId)
    }

    // 创建用户
    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto):Promise<User>{
        return this.usersService.createUser(CreateUserDto);
    }

    // 关注用户
    @UseGuards(JwtAuthGuard)
    @Put('following/:id')
    async followUser(@Param('id') userId:string,@DUser() user:User):Promise<any>{
        return await this.usersService.followUser(userId,user._id)
    }
    // 取消关注用户
    @UseGuards(JwtAuthGuard)
    @Delete('following/:id')
    async unfollowUser(@Param('id') userId:string,@DUser() user:User){
        return await this.usersService.unfollowUser(userId,user._id)
    }

    // 查看关注的人列表
    @UseGuards(JwtAuthGuard)
    @Get(':id/followers')
    async listFollowers(@Param('id') id:string):Promise<FollowersList>{
        return {
            followers:await this.usersService.listFollowers(id)
        }
    }

    // 关注话题
    @UseGuards(JwtAuthGuard)
    @Put('followingTopic/:id')
    async followTopic(@Param() followTopicDto:FollowTopicDto,@DUser() user:User):Promise<PlainLiteralObject>{
        const topic = await this.topicService.findTopicById(followTopicDto.id)
        if (topic){
            return this.usersService.followTopic(followTopicDto.id,user._id)
        }else {
            throw new HttpException('话题不存在',HttpStatus.NOT_FOUND)
        }
    }

    // 取消关注话题
    @UseGuards(JwtAuthGuard)
    @Delete('followingTopic/:id')
    async unFollowTopic(@Param() unFollowTopicDto:FollowTopicDto,@DUser() user:User){
        const topic = await this.topicService.findTopicById(unFollowTopicDto.id)
        if (topic){
            return this.usersService.unFollowTopic(unFollowTopicDto.id,user._id)
        }else {
            throw new HttpException('话题不存在',HttpStatus.NOT_FOUND)
        }
    }
    // 获取关注话题列表
    @UseGuards(JwtAuthGuard)
    @Get(':id/followingTopics')
    async getFollowingTopics(@Param() FollowTopicDto:FollowTopicDto){
        const result = await this.usersService.getFollowingTopics(FollowTopicDto.id)
        return {
            topics:result
        }
    }

    // 用户提问的问题
    @Get('/:id/questions')
    async userQuestions(@Param('id') id:string){
        return {
            questions:await this.usersService.getUserQuestions(id)
        }
    }


    //用户赞过的答案列表
    @UseGuards(JwtAuthGuard)
    @Get('/:id/likingAnswers')
    async listLikingAnswers(@Param('id') id:string){
        return {
            likingAnswers:await this.usersService.getListLiking(id)
        }
    }

    // 赞答案
    @UseGuards(JwtAuthGuard)
    @Put('/likingAnswers/:id')
    async unDislikeAnswer(@DUser() user:User,@Param('id') id:string){
        await this.answerService.fabulousAnswer(id,user)
        return {}
    }

    // 取消赞答案
    @UseGuards(JwtAuthGuard)
    @Delete('/likingAnswers/:id')
    async unlikeAnswer(@DUser() user:User,@Param('id') id:string){
        await this.answerService.unlikeAnswer(id,user)
        return {}
    }


    // 用户踩过的答案列表
    @Get('/:id/dislikingAnswers')
    async dislikingAnswers(@Param('id') id:string){
        return {
            dislikingAnswers:await this.answerService.dislikingAnswers(id)
        }
    }

    // 踩答案
    @UseGuards(JwtAuthGuard)
    @Put('/dislikingAnswers/:id')
    async toDislikingAnswer(@DUser() user:User,@Param('id') id:string){
        await this.answerService.toDislikingAnswer(id,user)
        return {}
    }

    // 取消踩答案
    @UseGuards(JwtAuthGuard)
    @Delete('/dislikingAnswers/:id')
    async unDislikingAnswer(@DUser() user:User,@Param('id') id:string){
        await this.answerService.undislikingAnswers(id,user)
        return {}
    }

    // 用户收藏了哪些答案
    @UseGuards(JwtAuthGuard)
    @Get('/:id/collectingAnswers')
    async getDollectingAnswers(@DUser() user:User,@Param('id') id:string){
        return {
            answers:await this.usersService.listCollectingAnswers(user)
        }
    }

    // 收藏答案
    @UseGuards(JwtAuthGuard)
    @Put('/collectingAnswers/:id')
    async collectAnswer(@DUser() user:User,@Param('id') id:string){
        await this.answerService.toCollectAnswer(user,id)
        return {}
    }

    // 取消收藏答案
    @UseGuards(JwtAuthGuard)
    @Delete('/collectingAnswers/:id')
    async cancelCollectingAnswer(@DUser() user:User,@Param('id') id:string){
        await this.answerService.cancelCollectingAnswer(user,id)
        return {}
    }
}