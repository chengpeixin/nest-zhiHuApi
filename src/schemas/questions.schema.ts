import * as Mongoose from 'mongoose'
// 分页插件
import * as mongoosePaginate  from 'mongoose-paginate-v2'

const { Schema, model } = Mongoose

export const QuestionSchema = new Schema({
    __v:{
      type:Number,
      select:false
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    questioner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        select:false
    },
    topics:{
        type:[
            {
                type:Schema.Types.ObjectId,
                ref:'Topic',
                select:false
            }
        ],
        select:false
    }
})

QuestionSchema.plugin(mongoosePaginate)
