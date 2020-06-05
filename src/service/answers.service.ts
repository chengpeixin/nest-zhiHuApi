import { Injectable, Inject, Req, HttpException, HttpStatus, PlainLiteralObject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Answer } from 'src/interface/question.interface';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_MODEL')
    private answerModel: Model<Answer>,
  ) {}

  getnames(){
    return "萨维奇呃的阿斯顿撒萨达萨达撒旦撒"
  }
}
