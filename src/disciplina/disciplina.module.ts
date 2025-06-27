import { Module } from "@nestjs/common";
import { DisciplinaController } from "./disciplina.controller";
import { DisciplinaService } from "./disciplina.service";
import { PrismaService } from "src/database/prisma.service";

@Module({
    providers:[DisciplinaService, PrismaService],
    controllers:[DisciplinaController],

})

export class DisciplinaModule {}