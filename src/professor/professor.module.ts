import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';

@Module({
  controllers: [ProfessorController],
  providers: [ProfessorService, PrismaService],
})
export class ProfessorModule { }
