
import * as Mongoose from 'mongoose'
// 分页插件
import * as mongoosePaginate  from 'mongoose-paginate-v2'

const { Schema, model } = Mongoose


export const UserSchema = new Schema({
    __v:{
        type:Number,
        select:false
    },
    name: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar_url:{
        type:String
    },
    gender:{
        type:String,
        enum:['male','fmale'],
        default:'male',
        required:true,
        select:false
    },
    headline:{
        type:String
    },
    locations:{
        type:[{type:Schema.Types.ObjectId,ref:'Topics'}],
        select:false
    },
    business:{
        type:[{type:Schema.Types.ObjectId,ref:'Topics'}],
        select:false
    },
    employments:{
        type:[{
            company:{
                type:Schema.Types.ObjectId,
                ref:'Topics'
            },
            job:{
                type:Schema.Types.ObjectId,
                ref:'Topics'
            }
        }],
        select:false
    },
    educations:{
        type:[{
            school:{
                type:Schema.Types.ObjectId,
                ref:'Topics'
            },
            major:{
                type:Schema.Types.ObjectId,
                ref:'Topics'
            },
            diploma:{
                type:Number,
                enum:[1,2,3,4,5]
            },
            entrance_year:{
                type:Number
            },
            graduation:{
                type:Number
            }
        }],
        select:false
    },
    following:{
        type:[{type:Schema.Types.ObjectId,ref:'User'}],
        select:false
    },
    followingTopics:{
        type:[{
            type:Schema.Types.ObjectId,ref:'Topic'
        }],
        select:false
    },
    liningAnswers:{
        type:[{
            type:Schema.Types.ObjectId,ref:'Answers'
        }],
        select:false
    },
    disliningAnswers:{
        type:[{
            type:Schema.Types.ObjectId,ref:'Answers'
        }],
        select:false
    },
    collectingAnswers:{
        type:[{
            type:Schema.Types.ObjectId,ref:'Answers'
        }],
        select:false
    }
})

UserSchema.plugin(mongoosePaginate )