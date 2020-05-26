import { Injectable, Inject, Req, HttpException, HttpStatus, PlainLiteralObject } from '@nestjs/common';
import { Model } from 'mongoose';
// import { User } from './../interface/user.interface';
import { Topic } from 'src/interface/topic.interface';
import { FindTopicDto, FindTopicsDto } from 'src/dto/topic.dto';
import { User } from 'src/interface/user.interface';
import { Question } from 'src/interface/question.interface';
import { CreateQuestion, FindQuestionDto } from 'src/dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @Inject('QUESTION_MODEL')
    private questionModel: Model<Question>,
  ) {}
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
}
