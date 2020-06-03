
import * as Mongoose from 'mongoose'
// 分页插件
import * as mongoosePaginate  from 'mongoose-paginate-v2'

const { Schema, model } = Mongoose


export const AnswersSchema = new Schema({
    __v:{type:Number,select:false},
    content:{type:String,required:true},
    answerer:{type:Schema.Types.ObjectId,ref:'User',required:true,select:true},
    questionId:{type:String,select:true},
    voteCount:{type:Number,required:true,default:0}
})

AnswersSchema.plugin(mongoosePaginate)