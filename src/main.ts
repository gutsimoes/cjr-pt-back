import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(passport.initialize());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //strings para o tipo correto declarado no DTO
      whitelist: true, // emove campos não declarados no DTO
      forbidNonWhitelisted: true, // lança erro se campos extras forem enviados
    }),
  );


  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
