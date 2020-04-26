import { Injectable } from '@nestjs/common';
interface userInfo {
  age:number,
  name:string
}
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
