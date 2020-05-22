import { Document } from 'mongoose';

export interface Topic extends Document {
    readonly __v: number;
    readonly name:string;
    readonly avatar_url:string;
    readonly introduction:string;
}


export interface CreateTopic {
    topic:Topic
}