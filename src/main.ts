import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { PaginateParseIntPipe } from './pipes/paginate.pipe'
import { getLogger } from './lib/Logger'
import * as rateLimit from 'express-rate-limit'
async function bootstrap() {

  const app = await NestFactory.create(AppModule,{
    logger:getLogger()
  });
  app['set']('trust proxy', 1)
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }))
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
