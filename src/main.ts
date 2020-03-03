import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import HttpExceptionFilter from './infrastructure/exceptions/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule.foorRoot({}));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
