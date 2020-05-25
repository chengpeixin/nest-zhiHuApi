import { Injectable, Inject, Req, HttpException, HttpStatus, PlainLiteralObject } from '@nestjs/common';
import { Model } from 'mongoose';
// import { User } from './../interface/user.interface';
import { Topic } from 'src/interface/topic.interface';
import { FindTopicDto, FindTopicsDto } from 'src/dto/topic.dto';
import { User } from 'src/interface/user.interface';

@Injectable()
export class TopicService {
  constructor(
    @Inject('TOPIC_MODEL')
    private topicModel: Model<Topic>,
    @Inject('USER_MODEL')
    private userModel: Model<User>,
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

  // 修改单个话题
  async updateTopic(topicId:string,topicInfo:Topic):Promise<Topic>{
    const topic = await this.topicModel.findByIdAndUpdate(topicId,topicInfo)
    Object.assign(topic,topicInfo)
    return topic;
  }

  // 
  async getFollowerTopics(topicId:string){
    const users:User[] = await this.userModel.find({ 
      followingTopics:topicId
    })
    return users
  }
}
