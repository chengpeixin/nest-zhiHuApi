import { IsString, Min, MinLength, ValidateIf, IsNotEmpty } from "class-validator";

export class UpdatePassDto{
    @IsString({
        message:'newPass必传且为字符串类型'
    })
    @MinLength(6,{
        message:'新密码最短6位'
    })
    newPass :string;

    @IsString({
        message:'oldPass必传且为字符串类型'
    })
    oldPass:string;
}