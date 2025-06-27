import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { AvaliacaoModule } from 'src/avaliacao/avaliacao.module';
import { DisciplinaModule } from 'src/disciplina/disciplina.module';
@Module({
  imports:[UserModule, AvaliacaoModule, DisciplinaModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
