import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { AvaliacaoModule } from 'src/avaliacao/avaliacao.module';
@Module({
  imports:[UserModule, AvaliacaoModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
