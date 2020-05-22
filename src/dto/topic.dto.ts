import { IsString, MinLength, MaxLength, IsInt, Min } from "class-validator";
import { User } from "src/interface/user.interface";
const NAME_LENGTH:number = 6
const STRING_MESSAGE = '必须是字符串类型'

export class CreateTopicDto {
    @IsString()
    @MaxLength(50)
    name:string;
    @IsString()
    avatar_url:string;
    @IsString()
    @MinLength(20)
    @MaxLength(500)
    introduction:string;
}

export class FindTopicsDto{
    @IsString({
        message:'名称必须是字符串类型'
    })
    name:string;

    @IsInt({
        message:'当前页数必须为数字类型'
    })
    @Min(1,{
        message:'最小页数为1'
    })
    page:number;

    @IsInt({
        message:'分页参数必须为数字类型'
    })
    @Min(1,{
        message:'分页参数最小为1'
    })
    limit:number;
}

export class FindTopicDto{
    @IsString({
        message:'id必须是字符串'
    })
    topicId:string
}





export class DeleteUserDto {
    user:User
}