import { Injectable } from "@nestjs/common";
import { RedisService } from "nestjs-redis";

@Injectable()
export class CacheService{
    public client;
    constructor(private redisService:RedisService){
        this.getClient()
    }
    async getClient():Promise<void>{
        this.client = await this.redisService.getClient()
    }
    async set(key:string,value:any,seconds?:number){
        value = JSON.stringify(value)
        if (!this.client){
            await this.getClient()
        }
        if (!seconds){
            await this.client.set(key,value)
        } else {
            await this.client.set(key,value,'EX',seconds)
        }
    }
    async get (key:string){
        if (!this.client){
            await this.getClient()
        }
        let result = await this.client.get(key)
        if (!result) return ;
        return JSON.parse(result)
    }

    async remove(key:string){
        await this.client.del(key)
    }
}