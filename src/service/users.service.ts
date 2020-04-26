import { Injectable, Inject, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './../interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getName(params): Promise<User> {
    const repeatedUser = await this.userModel.findOne(params)
    if (repeatedUser){
      throw new HttpException('用户已存在,创建失败',HttpStatus.CONFLICT)
    }
    const user = await new this.userModel(params).save()
    return user;
  }
}
