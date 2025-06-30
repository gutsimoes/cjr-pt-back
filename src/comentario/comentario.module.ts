import { Module } from '@nestjs/common';
import { ComentarioController } from './comentario.controller';
import { ComentarioService } from './comentario.service';

@Module({
  controllers: [ComentarioController],
  providers: [ComentarioService]
})
export class ComentarioModule {}
