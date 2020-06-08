import { Document } from 'mongoose';
export interface Question extends Document{
    readonly __v: number;
    readonly title:string;
    readonly description:string;
    readonly questioner:any;
    readonly topics:any[];
}



export interface Answer extends Document{
    readonly __v: number;
    readonly content:string;
    readonly answerer:string;
    readonly questionId:string;
}