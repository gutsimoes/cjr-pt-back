import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { AvaliacaoModule } from 'src/avaliacao/avaliacao.module';
import { DisciplinaModule } from 'src/disciplina/disciplina.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/auth-guards';
import { JwtModule } from '@nestjs/jwt';
import { ProfessorModule } from 'src/professor/professor.module';

@Module({
  imports: [
    UserModule,
    AvaliacaoModule,
    DisciplinaModule,
    AuthModule,
    JwtModule,
    ProfessorModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }