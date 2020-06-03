// 监控
import * as Sentry from '@sentry/node'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { PaginateParseIntPipe } from './pipes/paginate.pipe'
import { getLogger } from './lib/Logger'
import * as rateLimit from 'express-rate-limit'
import { SentryInterceptor } from './interceptor/sentry.interceptor';
import { sentryDsn } from 'config';
import { isProduction } from './util/util';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:getLogger()
  });
  processApp(app)
  await app.listen(3000);
}

async function processApp (app){
  if (isProduction){
    Sentry.init({ dsn: sentryDsn });
  }
  app['set']('trust proxy', 1)
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }))
  app.useGlobalPipes(new PaginateParseIntPipe())
     .useGlobalPipes(new ValidationPipe({transform: true}))
     .useGlobalFilters(new HttpExceptionFilter())
     .useGlobalInterceptors(new TransformInterceptor())
     .useGlobalInterceptors(new SentryInterceptor());
}

bootstrap();