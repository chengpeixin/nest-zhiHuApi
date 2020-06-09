import { Injectable, Inject, Req, HttpException, HttpStatus, PlainLiteralObject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './../interface/user.interface';
import { CreateUserDto, FindUsersDto } from 'src/dto/users.dto';
import { Topic } from 'src/interface/topic.interface';
import { Question } from 'src/interface/question.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    @Inject('QUESTION_MODEL')
    private questionModel: Model<Question>,
  ) {}
  // 创建用户
  async createUser(createParams:CreateUserDto): Promise<User> {
    const {name} = createParams
    const repeatedUser:any = await this.userModel.findOne({name:name})
    if (repeatedUser){
      throw new HttpException('用户已存在,创建失败',HttpStatus.CONFLICT)
    }
    const user = await new this.userModel(createParams).save()
    return user;
  }

  // 分页查询用户
  async getFindUsers({page,limit,name}:FindUsersDto): Promise<User[]>{
    const select = '+gender'
    return await this.userModel['paginate'](
      {
        name:new RegExp(name)
      },
      {
        page,limit,select
      }
    )
  }

  // 根据id查找用户
  async findByIdUser(id,selectFields){
    let user;
    if (selectFields){
      user = await this.userModel.findById(id).select(selectFields)
    }else {
      user = await this.userModel.findById(id)
    }
    if  (!user) throw new HttpException('用户不存在',HttpStatus.NOT_FOUND)
    return user
  }

  // 注销账号
  async deleteUser(userId):Promise<any>{ 
    const user = await this.userModel.findByIdAndRemove(userId)
    return {}
  }

  // 修改密码
  async updatePassword(newPass, oldPass,userId):Promise<User | null>{
    const user = await this.userModel.findByIdAndUpdate(userId,{
      password:newPass
    })
    return user
  }

  // 关注用户
  async followUser(followingId: string,myId: string):Promise<PlainLiteralObject>{
    const me = await this.findByIdUser(myId,'+following')
    if (!me.following.map((id: { toString: () => any; })=>id.toString()).includes(followingId)){
      me.following.push(followingId)
      me.save()
    }
    return {}
  }

  // 取消关注用户
  async unfollowUser(unfollowUserId:string,myId:string):Promise<PlainLiteralObject>{
    const me = await this.findByIdUser(myId,'+following')
    const index = me.following.map((id: { toString: () => any; })=>id.toString()).indexOf(unfollowUserId)
    if (index>-1){
        me.following.splice(index,1)
        me.save()
    }
    return {}
  }

  // 根据账号密码查找用户
  async findOne(...args):Promise<User | undefined | null>{
    return await this.userModel.findOne(...args).select('+password')
  }

  // 获取关注人列表
  async listFollowers(id: string):Promise<User[]>{
    // 查找followingID为传入id的数据
    const users:Array<User> = await this.userModel.find({
      following:id
    })
    return users
  }

  // 关注某个话题
  async followTopic(topicId:string,userId:string):Promise<PlainLiteralObject>{
    const me:User = await this.userModel.findById(userId).select('+followingTopics')
    if (!me.followingTopics.map(id=>id.toString()).includes(topicId)){
        me.followingTopics.push(topicId)
        me.save()
    }
    return {};
  }

  // 取消关注话题
  async unFollowTopic(topicId:string,userId:string):Promise<PlainLiteralObject>{
    const me = await this.userModel.findById(userId).select('+followingTopics')
    const index = me.followingTopics.map(id=>id.toString()).indexOf(topicId)
    if (index>-1){
        me.followingTopics.splice(index,1)
        me.save()
    }
    return {}
  }

  // 获取关注话题列表
  async getFollowingTopics(id:string):Promise<Topic[]>{
    const user:User = await this.userModel.findById(id).select('+followingTopics').populate('followingTopics')
    if(!user){
        throw new HttpException('用户不存在',HttpStatus.NOT_FOUND)
    }else{
      return user.followingTopics;
    }
  }


  // 用户回答的问题列表
  async getUserQuestions(id:string){
    return this.questionModel.find({questioner:id})
  }

  // 根据id查询用户
  async findOneByUserId(_id:string):Promise<User>{
    return await this.userModel.findById(_id).select('+password')
  }
}
