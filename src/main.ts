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
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:getLogger()
  });
  Sentry.init({ dsn: sentryDsn });
  app['set']('trust proxy', 1)
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }))
  app.useGlobalPipes(new PaginateParseIntPipe())
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true
    }
  ));
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor()).useGlobalInterceptors(new SentryInterceptor())
  await app.listen(3000);
}
bootstrap();
