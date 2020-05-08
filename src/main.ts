import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import {PaginateParseIntPipe} from './pipes/paginate.pipe'
import { WinstonModule } from 'nest-winston'
import * as Winston from 'winston'
/**
 * {
    logger:WinstonModule.createLogger({
      level: 'info',
      format: Winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new Winston.transports.File({ filename: 'error.log', level: 'error' }),
        new Winston.transports.File({ filename: 'combined.log' })
      ]
    })
  }
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule,);
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
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
