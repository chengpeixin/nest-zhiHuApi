import { Injectable, Inject, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './../interface/user.interface';
import { CreateUserDto, FindUsersDto } from 'src/dto/users.dto';

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
    // const populate = fields.split(';').filter(f=>f).map(f=>{
    //     switch (f) {
    //         case 'employments': return 'employments.company employments.job';
    //         case 'educations':return 'educations.school educations.major';
    //         default: return f
    //     }
    // }).join(' ')
    const user = await this.userModel.findById(id) //.select(selectFields).populate(populate)
    if  (!user) throw new HttpException('用户不存在',HttpStatus.NOT_FOUND)
    return user
  }

  // 修改密码
  async updatePassword(params):Promise<User | null>{
    console.log(params)
    return null
  }

  // 根据账号密码查找用户
  async findOne(...args):Promise<User | undefined | null>{
    return await this.userModel.findOne(...args)
  }
}
