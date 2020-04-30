import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response, Request } from "express";
interface CheckDataErrorResoponse {
    statusCode:number;
    message:string;
    error:string[];
}


@Catch(HttpException)
export  class HttpExceptionFilter  implements ExceptionFilter {
    catch (exception:HttpException|any,host:ArgumentsHost){
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        let message = exception.message
        const status = exception instanceof HttpException ?
        exception.getStatus():HttpStatus.INTERNAL_SERVER_ERROR;
        const CheckErrorResponse:CheckDataErrorResoponse = exception.response
        if (CheckErrorResponse&&CheckErrorResponse.error){
            message = CheckErrorResponse.error[0]
        }
        const errorResponse = {
            data:{},
            message,
            status,
            timestamp: new Date().getTime(),
            url: request.originalUrl
        }
        response.status(status).json(errorResponse)
    }
}