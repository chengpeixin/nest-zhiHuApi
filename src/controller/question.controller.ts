import { Controller, Get, Post, Param, Body, Query, UseGuards, Delete, Req, HttpException, HttpStatus, Put, PlainLiteralObject, Patch } from '@nestjs/common';
import { QuestionService } from 'src/service/question.service';
import { FindQuestionDto, CreateQustionDto } from 'src/dto/question.dto';
import { Question } from 'src/interface/question.interface';
import { DUser } from 'src/decorators/user.decorator';
import { User } from 'src/interface/user.interface';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';

@Controller('question')
export class QuestionController {
    constructor(private questionService:QuestionService){}

    // 获取分页问题列表
    @Get()
    async getQuestions(@Query() findQuestionDto:FindQuestionDto){
        return await this.questionService.getQuestions(findQuestionDto)
    }


    // 创建问题
    @UseGuards(JwtAuthGuard)
    @Post()
    async createQustion(@Body() createQustion:CreateQustionDto,@DUser() user:User):Promise<Question>{
        return await this.questionService.createQuestion(createQustion,user._id)
    }

    // 修改问题
    // @UseGuards(JwtAuthGuard)
    // @Patch()
    // async updateQuestion ():Promise<Question>{

    // }

    // 查询问题详情
    @Get(':id')
    async getQuestionInfo(@Param('id') questionId:string):Promise<Question>{
        return await this.questionService.getQuestionInfo(questionId)
    }
    // 删除问题
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteQuestion(@Param('id') id:string,@DUser() user:User){
        return await this.questionService.deleteQuestion(id,user)
    }
}