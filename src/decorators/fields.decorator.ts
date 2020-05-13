import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SelectFields = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const query = ctx.switchToHttp().getRequest().query
    const fields:string = query.fields
    let selectFields:string = ''
    if (fields){
      selectFields = fields.split(';').filter(f=>f).map(f=>`+${f}`).join(' ')
    }
    return selectFields;
  },
);