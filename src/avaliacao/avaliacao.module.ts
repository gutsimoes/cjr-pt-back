import { Module } from "@nestjs/common";
import { AvaliacaoController } from "./avaliacao.controller";
import { AvaliacaoService } from "./avaliacao.service";
import { PrismaService } from "src/database/prisma.service";

@Module({
    providers:[AvaliacaoService, PrismaService],
    controllers:[AvaliacaoController],

})

export class AvaliacaoModule {}