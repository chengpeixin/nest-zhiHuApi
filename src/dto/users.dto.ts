import { IsString, MinLength, MaxLength, IsInt, Min } from "class-validator";
const NAME_LENGTH:number = 6
const STRING_MESSAGE = '必须是字符串类型'

export class CreateUserDto {
    @IsString({
        message:`账号${STRING_MESSAGE}`
    })
    @MinLength(6,{
        message:`账号长度最小为${NAME_LENGTH}位`
    })
    name:string;
    @IsString({
        message:`密码${STRING_MESSAGE}`
    })
    @MinLength(6,{
        message:`密码长度最小为${NAME_LENGTH}位`
    })
    @MaxLength(20)
    password:string;
}

export class FindUsersDto {
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

export class LoginDto{
    @IsString({
        message:'name必传且为字符串类型'
    })
    name :string;
    @IsString({
        message:'password必传且为字符串类型'
    })
    password:string;
}