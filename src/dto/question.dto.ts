import { IsString, Min, MinLength, ValidateIf, IsNotEmpty, IsArray, IsInt } from "class-validator";

export class CreateQuestion{
    @IsString()
    title :string;
    @IsString()
    description:string;
}

export class FindQuestionDto{
    @IsString({
        message:'title必须是字符串类型'
    })
    title:string;

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
