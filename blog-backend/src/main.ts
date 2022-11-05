const express = require('express')
const path = require('path');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(express.static(path.join(__dirname, '../build')));


  await app.listen(process.env.PORT || 5000);
}
bootstrap();
