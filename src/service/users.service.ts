import { Injectable, Inject, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './../interface/user.interface';
import { CreateUserDto, FindUsersDto } from 'src/dto/users.dto';
import { promises } from 'dns';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}
  // 创建用户
  async createUser(createParams:CreateUserDto): Promise<User> {
    const {name} = createParams
    const repeatedUser = await this.userModel.findOne({name:name})
    if (repeatedUser){
      throw new HttpException('用户已存在,创建失败',HttpStatus.CONFLICT)
    }
    const user = await new this.userModel(createParams).save()
    return user;
  }

  // 分页查询用户
  async getFindUsers(params:FindUsersDto): Promise<User[]>{
    console.log(params)
    return await this.userModel['paginate'](

    )
    // const {per_page=10,q='',page} = params
    // const currentPage = Math.max(page * 1,1 )-1
    // const perPage = Math.max(per_page * 1,1)
    // return await this.userModel.find({
    //     name:new RegExp(q)
    // }).limit(perPage).skip(currentPage*perPage)
  }

  // 根据id查找用户
  async findByIdUser(id,params){
    let {fields=';'} = params
    const selectFields = fields.split(';').filter(f=>f).map(f=>`+${f}`).join(' ')
    const populate = fields.split(';').filter(f=>f).map(f=>{
        switch (f) {
            case 'employments': return 'employments.company employments.job';
            case 'educations':return 'educations.school educations.major';
            default: return f
        }
    }).join(' ')
    const user = await this.userModel.findById(id).select(selectFields).populate(populate)
    if  (!user) throw new HttpException('用户不存在',HttpStatus.NOT_FOUND)
    return user
  }
}
