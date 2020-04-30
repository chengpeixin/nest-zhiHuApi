import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators'
interface Response<T> {
    data: T;
  }
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T,Response<T>>{
    intercept(ctx:ExecutionContext,next:CallHandler<T>):Observable<Response<T>>{
        return next.handle().pipe(map(data=>{
            console.log(data)
            return {
                data,
                code:HttpStatus.OK,
                message:'请求成功'
            }
        }))
    }
}