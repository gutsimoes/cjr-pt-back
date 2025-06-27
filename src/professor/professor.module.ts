import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfessorController } from './professor.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
    imports: [PrismaModule],
    providers: [ProfessorService, PrismaService],
    controllers: [ProfessorController],
})
export class ProfessorModule {}