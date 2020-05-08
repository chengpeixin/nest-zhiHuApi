import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PaginateParseIntPipe implements PipeTransform {
  async transform(value: object|any, metadata: ArgumentMetadata): Promise<any> {
    const parseIntFields = ['page','limit']
    for (let i=0;i<parseIntFields.length;i++){
      const field = parseIntFields[i]
      if (value[field]){
        const parseIndField = parseInt(value[field])
        if (isNaN(parseIndField)) throw new BadRequestException(`当前 ${field} 字段值不正确`);
        value[field] = parseIndField
      }
    }
    return value;
  }
}