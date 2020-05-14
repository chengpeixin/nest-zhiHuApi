import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import {PaginateParseIntPipe} from './pipes/paginate.pipe'
import {getLogger} from './lib/Logger'

async function bootstrap() {

  const app = await NestFactory.create(AppModule,{
    logger:getLogger()
  });
  app.useGlobalPipes(new PaginateParseIntPipe())
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true
    }
  ));
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3000);
}
bootstrap();
