import { Injectable, Inject, Req, HttpException, HttpStatus, PlainLiteralObject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Answer } from 'src/interface/question.interface';
import { User } from 'src/interface/user.interface';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_MODEL')
    private answerModel: Model<Answer>,
        @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  getnames(){
    return "萨维奇呃的阿斯顿撒萨达萨达撒旦撒"
  }

  // 获取答案分页
  async getAnswers(questionId:string,{page,limit}:any):Promise<any>{
    return await this.answerModel['paginate'](
      {
        questionId:questionId
      },
      {
        page,limit
      }
    )
  }

  // 创建答案
  async createAnswer(_id:string,createAnswer:any,questionId:string):Promise<Answer>{
    const answers:Answer = await new this.answerModel({
      ...createAnswer,answerer:_id,questionId
    }).save()
    return answers;
  }

  // 查看答案详情
  async getAnswerById(questionId:string,answerId:string){
    const answer = await this.checkAnswersExist(questionId,answerId)
    return answer
  }

  // 修改答案
  async updateAnswer(questionId:string,answerId:string,user:User,updateAnswer:any){
    const answer = await this.checkAnswersExist(questionId,answerId)
    await this.checkAnswerer(user._id,answer)
    await answer.update(updateAnswer)
    return Object.assign(answer,updateAnswer);
  }


  // 点赞答案
  async fabulousAnswer(id:string,user:User){
    await this.checkAnswersExist(null,id)
    const me = await this.userModel.findById(user._id).select('+liningAnswers')
    if (!me.liningAnswers.map(id=>id.toString()).includes(id)){
      me.liningAnswers.push(id)
      me.save()
      await this.answerModel.findByIdAndUpdate(id,{
          $inc:{voteCount:1}
      })
    }
    return await this.unDislikeAnswer(id,user._id)
  }


  // 取消踩答案
  async unDislikeAnswer(id:string,userId:string){
    const me = await this.userModel.findById(userId).select('+disliningAnswers')
    const index = me.disliningAnswers.map(id=>id.toString()).indexOf(id)
    if (index>-1){
      me.disliningAnswers.splice(index,1)
      me.save()
      await this.answerModel.findByIdAndUpdate(id,{
          $inc:{voteCount:-1}
      })
    }
    return {};
  }


  // 取消赞答案
  async unlikeAnswer(id:string,user:User){
    await this.checkAnswersExist(null,id)
    const me = await this.userModel.findById(user._id).select('+liningAnswers')
    const index = me.liningAnswers.map(id=>id.toString()).indexOf(id)
    if (index>-1){
        me.liningAnswers.splice(index,1)
        me.save()
        await this.answerModel.findByIdAndUpdate(id,{
            $inc:{voteCount:-1}
        })
    }
    return {}
  }


  // 判断是否存在答案
  async checkAnswersExist(questionId:string|undefined|null,answerId:string){
    const answers = await this.answerModel.findById(answerId)
    if (!answers) {
      throw new HttpException('答案不存在',404)
    }
    if (questionId && answers.questionId!==questionId){
      throw new HttpException('该问题下没有此答案',404)
    }
    return answers;
  }
  // 检查回答者是不是自己
  async checkAnswerer (userId:string,answers:Answer){
    if (answers.answerer.toString()!==userId.toString()){
      throw new HttpException('没有权限',403)
    }
  }


  // 删除答案
  async deleteAnswer(user:User,id:string,questionId:string){
    const answer = await this.checkAnswersExist(questionId,id)
    await this.checkAnswerer(user._id,answer)
    await this.answerModel.findByIdAndRemove(id);
    return {};
  }
}
