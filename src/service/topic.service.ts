import { Injectable, Inject, Req, HttpException, HttpStatus, PlainLiteralObject } from '@nestjs/common';
import { Model } from 'mongoose';
// import { User } from './../interface/user.interface';
import { Topic } from 'src/interface/topic.interface';
import { FindTopicDto, FindTopicsDto } from 'src/dto/topic.dto';

@Injectable()
export class TopicService {
  constructor(
    @Inject('TOPIC_MODEL')
    private topicModel: Model<Topic>,
  ) {}

  // 创建话题
  async createTopic(tipocData):Promise<Topic>{
    const currentTopic:Topic = await new this.topicModel(tipocData).save()
    return currentTopic
  }

  // 查找话题列表
  async findTopics({page,limit,name}:FindTopicsDto):Promise<Topic[]>{
    return await this.topicModel['paginate'](
      {
        name:new RegExp(name)
      },
      {
        page,limit
      }
    )
  }

  // 查找单个话题
  async findTopicById(topicId:string):Promise<Topic>{
    return await this.topicModel.findById(topicId);
  }
}
