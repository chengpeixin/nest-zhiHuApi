import { Injectable, Inject, Req, HttpException, HttpStatus, PlainLiteralObject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Question } from 'src/interface/question.interface';
import { FindQuestionDto, CreateQustionDto } from 'src/dto/question.dto';
import { User } from 'src/interface/user.interface';
import { asap } from 'rxjs/internal/scheduler/asap';

@Injectable()
export class QuestionService {
  constructor(
    @Inject('QUESTION_MODEL')
    private questionModel: Model<Question>,
  ) {}
  // 分页查询
  async getQuestions({page,limit,title}:FindQuestionDto){
    return await this.questionModel['paginate'](
      {
        title:new RegExp(title)
      },
      {
        page,limit
      }
    )
  }

  // 创建问题
  async createQuestion(question:CreateQustionDto,userId:string):Promise<Question>{
    const currentQuestion:Question = await new this.questionModel({...question,questioner:userId}).save()
    return currentQuestion
  }

  // 删除问题
  async deleteQuestion(id:string,user:User):Promise<PlainLiteralObject>{
    const question:Question = await this.checkQuestionExist(id)
    await this.checkQuestioner(question,user._id)
    await this.questionModel.findByIdAndRemove(id)
    return {}
  }

  // 获取问题相亲
  async getQuestionInfo(id:string):Promise<Question>{
    let question:any = await this.questionModel.findById(id)
    if (!question){
      question = {}
    }
    return question
  }

  // 修改问题
  async updateQuestion(questionId:string,updateQuestion:any,userId:string):Promise<Question>{
    const question:Question = await this.checkQuestionExist(questionId)
    await this.checkQuestioner(question,userId)
    await question.update(updateQuestion)
    return Object.assign(question,updateQuestion)
  }

  async checkQuestionExist(id:string):Promise<Question>{
    const question = await this.questionModel.findById(id).select('+questioner')
    if (!question) {
      throw new HttpException('问题不存在',404)
    }
    return question
  }

  async checkQuestioner(question:Question,userId:string):Promise<void>{
    if (question.questioner.toString()!==userId.toString()){
      throw new HttpException('权限不足',403)
    }
  }
}
