import { Document } from 'mongoose';

export interface User extends Document {
  readonly __v: number;
  readonly name: string;
  readonly password: string;
  readonly avatar_url: string;
  readonly gender: string;
  readonly headline: string;
  readonly locations: string[];
  readonly business: string[];
  readonly employments: string[];
  readonly educations: string[];
  readonly following: string[];
  readonly followingTopics: string[];
  readonly liningAnswers: string[];
  readonly disliningAnswers: string[];
  readonly collectingAnswers: string[];
}

export interface UserToken {
  readonly accessToken:string
}

export interface UserLogin {
  readonly name:string;
  readonly password:string;
}


type Followers = User[]


export interface FollowersList{
  followers:Followers
}