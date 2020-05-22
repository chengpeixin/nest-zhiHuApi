
import * as Mongoose from 'mongoose'
// 分页插件
import * as mongoosePaginate  from 'mongoose-paginate-v2'

const { Schema, model } = Mongoose


export const TopicSchema = new Schema({
    __v:{
        type:Number,
        select:false
    },
    name:{
      type:String,
      required:true
    },
    avatar_url:{
      default:'https://pic4.zhimg.com/da8e974dc_xl.jpg',
      type:String
    },
    introduction:{
      type:String,
      default:'',
      select:true
    }
})

TopicSchema.plugin(mongoosePaginate )